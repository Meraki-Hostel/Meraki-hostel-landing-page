// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const legalState = vi.hoisted(() => ({ reviewStatus: "draft" as "draft" | "reviewed" }));

vi.mock("@/config/legal", () => ({
  legal: {
    privacy: {
      get reviewStatus() {
        return legalState.reviewStatus;
      },
    },
  },
}));

import { POST } from "@/app/api/lead/route";
import { resetRateLimit } from "@/lib/rate-limit";

const lead = {
  name: "Test Owner",
  property: "Example Residency",
  phone: "9876543210",
  email: "",
  city: "Pune",
  beds: "20-50",
  consent: true,
  website: "",
};

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": "203.0.113.7", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function configure() {
  vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.test/lead");
  vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "team@example.test");
  legalState.reviewStatus = "reviewed";
}

beforeEach(() => {
  resetRateLimit();
  legalState.reviewStatus = "draft";
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/lead", () => {
  it("returns 503 when nothing is configured and never calls fetch", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(request(lead));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("stays 503 with webhook + contact email while the privacy notice is a draft", async () => {
    configure();
    legalState.reviewStatus = "draft";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await POST(request(lead))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("stays 503 without a contact email", async () => {
    configure();
    vi.stubEnv("NEXT_PUBLIC_CONTACT_EMAIL", "");
    expect((await POST(request(lead))).status).toBe(503);
  });

  it("treats a non-https webhook as unset", async () => {
    configure();
    vi.stubEnv("LEAD_WEBHOOK_URL", "http://hooks.example.test/lead");
    expect((await POST(request(lead))).status).toBe(503);
  });

  it("returns 400 with fieldErrors for invalid input", async () => {
    const res = await POST(request({ ...lead, phone: "", email: "" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("invalid");
    expect(body.fieldErrors.phone).toBeDefined();
  });

  it("returns a generic 400 (no fieldErrors, never 200) for a honeypot hit", async () => {
    configure();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(request({ ...lead, website: "http://spam" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 400 for non-JSON and wrong content type", async () => {
    expect((await POST(request("not json"))).status).toBe(400);
    expect((await POST(request(lead, { "content-type": "text/plain" }))).status).toBe(400);
  });

  it("returns 200 only after the destination acknowledges with {ok:true}", async () => {
    configure();
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(request(lead));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent).not.toHaveProperty("website");
    expect(sent.name).toBe("Test Owner");
  });

  it("returns 502 when the destination answers 2xx without an ack (e.g. an HTML error page)", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<html>error</html>", { status: 200 })));
    expect((await POST(request(lead))).status).toBe(502);
  });

  it("returns 502 on upstream non-2xx and on network errors", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ ok: true }, { status: 500 })));
    expect((await POST(request(lead))).status).toBe(502);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
    expect((await POST(request(lead))).status).toBe(502);
  });

  it("rate-limits by trusted client IP with Retry-After", async () => {
    for (let i = 0; i < 5; i++) await POST(request(lead));
    const res = await POST(request(lead));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("never logs personal data", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ ok: false }, { status: 500 })));
    await POST(request(lead));
    const logged = vi.mocked(console.error).mock.calls.flat().join(" ");
    expect(logged).not.toContain("Test Owner");
    expect(logged).not.toContain("9876543210");
    expect(logged).not.toContain("hooks.example.test");
  });
});
