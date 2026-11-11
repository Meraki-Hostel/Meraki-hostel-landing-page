import { z } from "zod";

// Shared by the contact form (pre-validation) and /api/contact (authority).

export const INQUIRY_TYPES = ["pre-sales", "onboarding", "support"] as const;

export const CONTACT_LIMITS = { name: 80, contactMethod: 254, message: 2000 };

const EMAIL = z.email();
const PHONE = /^(?:\+91|0)?[6-9]\d{9}$/;

/** True when the value is a plausible email address or Indian mobile number. */
export function isEmailOrPhone(value: string) {
  const v = value.trim();
  return EMAIL.safeParse(v).success || PHONE.test(v.replace(/[\s-]/g, ""));
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(CONTACT_LIMITS.name, "Keep your name under 81 characters."),
  contactMethod: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.contactMethod, "This is too long.")
    .refine(isEmailOrPhone, {
      message:
        "Enter an email like name@example.com or a 10-digit mobile number.",
    }),
  inquiryType: z.enum(INQUIRY_TYPES, { error: "Choose an inquiry type." }),
  message: z
    .string()
    .trim()
    .min(5, "Please write your question or inquiry.")
    .max(CONTACT_LIMITS.message, "Keep your message under 2,001 characters."),
  consent: z.literal(true, { error: "Tick the box to agree before sending." }),
  // Honeypot: real visitors never see this field.
  website: z.string().max(0).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactField = Exclude<keyof ContactInput, "website">;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function toContactFieldErrors(error: z.ZodError): ContactFieldErrors {
  const out: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field !== "string" || field === "website") continue;
    out[field as ContactField] ??= issue.message;
  }
  return out;
}

export function isContactHoneypotHit(error: z.ZodError) {
  return error.issues.some((issue) => issue.path[0] === "website");
}
