import { getLeadWebhookUrl } from "@/lib/env";
import { isLeadCaptureEnabled } from "@/lib/lead-config";
import {
  contactSchema,
  isContactHoneypotHit,
  toContactFieldErrors,
} from "@/lib/contact-schema";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

// POST /api/contact — same delivery contract as /api/lead: success is reported
// only after the destination replies JSON {"ok": true}. Never fakes a success,
// never logs personal data or the webhook URL.

const MAX_BODY_BYTES = 8 * 1024;
const UPSTREAM_TIMEOUT_MS = 8000;

function reply(
  status: number,
  body: Record<string, unknown>,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

const invalid = () => reply(400, { ok: false, error: "invalid" });

export async function POST(request: Request) {
  try {
    const limit = checkRateLimit(`contact:${clientKey(request.headers)}`);
    if (!limit.allowed) {
      return reply(
        429,
        { ok: false, error: "rate_limited" },
        { "Retry-After": String(limit.retryAfter) },
      );
    }

    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .startsWith("application/json")
    )
      return invalid();
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return invalid();
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      return invalid();
    }

    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      if (isContactHoneypotHit(parsed.error)) return invalid();
      return reply(400, {
        ok: false,
        error: "invalid",
        fieldErrors: toContactFieldErrors(parsed.error),
      });
    }

    const webhook = getLeadWebhookUrl();
    if (!webhook || !isLeadCaptureEnabled()) {
      return reply(503, { ok: false, error: "not_configured" });
    }

    try {
      const { name, contactMethod, inquiryType, message, consent } =
        parsed.data;
      const upstream = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name,
          contactMethod,
          inquiryType,
          message,
          consent,
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        cache: "no-store",
      });
      const ack: unknown = await upstream.json().catch(() => null);
      if (!upstream.ok || (ack as { ok?: unknown } | null)?.ok !== true) {
        console.error(`contact: upstream_failed status=${upstream.status}`);
        return reply(502, { ok: false, error: "upstream" });
      }
    } catch {
      console.error("contact: upstream_failed status=network");
      return reply(502, { ok: false, error: "upstream" });
    }

    return reply(200, { ok: true });
  } catch {
    console.error("contact: server_error");
    return reply(500, { ok: false, error: "server" });
  }
}
