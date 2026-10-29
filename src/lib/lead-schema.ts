import { z } from "zod";

// Shared by the early-access form (pre-validation) and /api/lead (authority).
// Field rules: specs/01 §8.5 and specs/03 §9.1.

export const BED_OPTIONS = ["under-20", "20-50", "51-150", "over-150"] as const;
export const PROPERTY_OPTIONS = ["1", "2-3", "4+"] as const;

export const LIMITS = {
  name: { min: 2, max: 80 },
  property: { min: 2, max: 120 },
  city: { min: 2, max: 60 },
  email: 254,
  challenge: 500,
} as const;

const PHONE_PATTERN = /^(?:\+91|0)?[6-9]\d{9}$/;

export function normalisePhone(value: string) {
  return value.replace(/[\s-]/g, "");
}

const text = (label: string, { min, max }: { min: number; max: number }) =>
  z
    .string()
    .trim()
    .min(min, `Enter your ${label} (at least ${min} characters).`)
    .max(max, `Keep your ${label} under ${max + 1} characters.`);

export const leadSchema = z
  .object({
    name: text("full name", LIMITS.name),
    property: text("property or business name", LIMITS.property),
    phone: z
      .string()
      .trim()
      .transform(normalisePhone)
      .refine((value) => value === "" || PHONE_PATTERN.test(value), {
        message: "Enter a 10-digit Indian mobile number, for example 98765 43210.",
      }),
    email: z
      .string()
      .trim()
      .max(LIMITS.email, "This email address is too long.")
      .refine((value) => value === "" || z.email().safeParse(value).success, {
        message: "Enter an email address like name@example.com.",
      }),
    city: text("city", LIMITS.city),
    beds: z.enum(BED_OPTIONS, { error: "Choose the approximate number of beds." }),
    properties: z.union([z.enum(PROPERTY_OPTIONS), z.literal("")]).optional(),
    challenge: z
      .string()
      .trim()
      .max(LIMITS.challenge, `Keep this under ${LIMITS.challenge + 1} characters.`)
      .optional(),
    consent: z.literal(true, { error: "Tick the box to agree before sending." }),
    // Honeypot: real visitors never see this field.
    website: z.string().max(0).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.phone === "" && data.email === "") {
      const message = "Enter a mobile number or an email address so we can reach you.";
      ctx.addIssue({ code: "custom", path: ["phone"], message });
      ctx.addIssue({ code: "custom", path: ["email"], message });
    }
  });

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
export type LeadField = Exclude<keyof LeadInput, "website">;

export type FieldErrors = Partial<Record<LeadField, string>>;

/** First message per visible field. Honeypot issues are never reported. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string" || field === "website") continue;
    const key = field as LeadField;
    out[key] ??= issue.message;
  }
  return out;
}

export function isHoneypotHit(error: z.ZodError) {
  return error.issues.some((issue) => issue.path[0] === "website");
}

/** Only these fields ever leave the server. */
export function pickForwardedFields(lead: Lead) {
  return {
    name: lead.name,
    property: lead.property,
    phone: lead.phone,
    email: lead.email,
    city: lead.city,
    beds: lead.beds,
    properties: lead.properties ?? "",
    challenge: lead.challenge ?? "",
    consent: lead.consent,
  };
}
