// @vitest-environment node
import { describe, expect, it } from "vitest";
import { isHoneypotHit, leadSchema, pickForwardedFields, toFieldErrors } from "@/lib/lead-schema";

const valid = {
  name: "Test Owner",
  property: "Example Residency",
  phone: "98765 43210",
  email: "",
  city: "Pune",
  beds: "20-50",
  properties: "",
  challenge: "",
  consent: true,
  website: "",
};

describe("leadSchema", () => {
  it("accepts a phone-only lead and normalises the number", () => {
    const result = leadSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data?.phone).toBe("9876543210");
  });

  it.each(["+91 98765-43210", "09876543210", "6123456789"])("accepts Indian mobile %s", (phone) => {
    expect(leadSchema.safeParse({ ...valid, phone }).success).toBe(true);
  });

  it.each(["12345", "5876543210", "98765 4321"])("rejects invalid mobile %s", (phone) => {
    expect(leadSchema.safeParse({ ...valid, phone }).success).toBe(false);
  });

  it("accepts personal email domains", () => {
    expect(leadSchema.safeParse({ ...valid, phone: "", email: "owner@gmail.com" }).success).toBe(true);
  });

  it("requires at least one of phone or email, reported on both", () => {
    const result = leadSchema.safeParse({ ...valid, phone: "", email: "" });
    expect(result.success).toBe(false);
    const errors = toFieldErrors(result.error!);
    expect(errors.phone).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it("requires consent to be explicitly true", () => {
    const result = leadSchema.safeParse({ ...valid, consent: false });
    expect(toFieldErrors(result.error!).consent).toBeDefined();
  });

  it("enforces field limits", () => {
    expect(leadSchema.safeParse({ ...valid, name: "A" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, challenge: "x".repeat(501) }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, beds: "lots" }).success).toBe(false);
  });

  it("detects a honeypot hit and never reports it as a field error", () => {
    const result = leadSchema.safeParse({ ...valid, website: "spam" });
    expect(isHoneypotHit(result.error!)).toBe(true);
    expect(toFieldErrors(result.error!)).not.toHaveProperty("website");
  });

  it("forwards only the lead fields, never the honeypot", () => {
    const data = leadSchema.parse(valid);
    expect(Object.keys(pickForwardedFields(data))).not.toContain("website");
  });
});
