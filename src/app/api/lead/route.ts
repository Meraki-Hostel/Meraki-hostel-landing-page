import { getLeadWebhookUrl } from "@/lib/env";
import { isLeadCaptureEnabled } from "@/lib/lead-config";
import { isHoneypotHit, leadSchema, pickForwardedFields, toFieldErrors } from "@/lib/lead-schema";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

// POST /api/lead — contract in specs/03 §9. Success only after the destination
// acknowledges with JSON {"ok": true}. Never logs personal data or the webhook URL.

const MAX_BODY_BYTES = 8 * 1024;
const UPSTREAM_TIMEOUT_MS = 8000;

function reply(status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

const invalid = () => reply(400, { ok: false, error: "invalid" });

export async function POST(request: Request) {
  try {
    // 1. Rate limit
    const limit = checkRateLimit(clientKey(request.headers));
    if (!limit.allowed) {
      return reply(429, { ok: false, error: "rate_limited" }, { "Retry-After": String(limit.retryAfter) });
    }

    // 2. Parse
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return invalid();
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return invalid();
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      return invalid();
    }

    // 3. Validate (a honeypot hit gets the same generic 400, never a fake 200)
    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) {
      if (isHoneypotHit(parsed.error)) return invalid();
      return reply(400, { ok: false, error: "invalid", fieldErrors: toFieldErrors(parsed.error) });
    }

    // 4. Config: webhook + contact email + reviewed privacy notice
    const webhook = getLeadWebhookUrl();
    if (!webhook || !isLeadCaptureEnabled()) {
      return reply(503, { ok: false, error: "not_configured" });
    }

    // 5. Forward the picked fields only. 6. Require an explicit acknowledgement.
    try {
      const upstream = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...pickForwardedFields(parsed.data), submittedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        cache: "no-store",
      });
      const ack: unknown = await upstream.json().catch(() => null);
      if (!upstream.ok || (ack as { ok?: unknown } | null)?.ok !== true) {
        console.error(`lead: upstream_failed status=${upstream.status}`);
        return reply(502, { ok: false, error: "upstream" });
      }
    } catch {
      console.error("lead: upstream_failed status=network");
      return reply(502, { ok: false, error: "upstream" });
    }

    return reply(200, { ok: true });
  } catch {
    console.error("lead: server_error");
    return reply(500, { ok: false, error: "server" });
  }
}
