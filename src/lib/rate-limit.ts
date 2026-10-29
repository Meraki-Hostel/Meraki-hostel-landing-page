import "server-only";

// Best-effort, in-memory, per-instance sliding window (specs/03 §9.2).
// Holds client IPs only for the window and never persists them.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 5000;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    const retryAfter = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    return { allowed: false as const, retryAfter };
  }

  recent.push(now);
  hits.delete(key);
  hits.set(key, recent);
  if (hits.size > MAX_KEYS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return { allowed: true as const };
}

/** Platform-trusted client IP; never the first (client-forgeable) X-Forwarded-For hop. */
export function clientKey(headers: Headers) {
  const trusted = headers.get("x-real-ip") ?? headers.get("x-nf-client-connection-ip");
  if (trusted) return trusted.trim();
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded.split(",").map((hop) => hop.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return "unknown";
}

export function resetRateLimit() {
  hits.clear();
}
