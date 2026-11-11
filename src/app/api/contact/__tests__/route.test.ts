// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const legalState = vi.hoisted(() => ({
  reviewStatus: "draft" as "draft" | "reviewed",
}));

vi.mock("@/config/legal", () => ({
  legal: {
    privacy: {
      get reviewStatus() {
        return legalState.reviewStatus;
      },
    },
  },
}));

import { POST } from "@/app/api/contact/route";
import { resetRateLimit } from "@/lib/rate-limit";

const message = {
  name: "Test Owner",
  contactMethod: "owner@example.test",
  inquiryType: "pre-sales",
  message: "Do you support 3 properties?",
  consent: true,
  website: "",
};

function request(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": "203.0.113.9" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function configure() {
  vi.stubEnv("LEAD_WEBHOOK_URL", "https://hooks.example.test/contact");
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

describe("POST /api/contact", () => {
  it("returns 503 and never calls fetch when nothing is configured", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(request(message));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "not_configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns field errors for invalid input", async () => {
    configure();
    const res = await POST(
      request({ ...message, contactMethod: "nope", consent: false }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.fieldErrors).toHaveProperty("contactMethod");
    expect(body.fieldErrors).toHaveProperty("consent");
  });

  it("rejects a honeypot hit with a generic 400", async () => {
    configure();
    const res = await POST(request({ ...message, website: "http://spam" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid" });
  });

  it("reports success only after the destination acknowledges", async () => {
    configure();
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(request(message));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent).toMatchObject({ kind: "contact", name: "Test Owner" });
    expect(sent).not.toHaveProperty("website");
  });

  it("returns 502, not a fake success, when the destination does not acknowledge", async () => {
    configure();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(Response.json({ received: true })),
    );
    const res = await POST(request(message));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: "upstream" });
  });
});
