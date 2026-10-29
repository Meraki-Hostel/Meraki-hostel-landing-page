import { getPublicEnv } from "@/lib/env";

// Single source of brand identity. Renaming the product starts here (specs/05 §2).
export const brand = {
  name: "Meraki", // temporary name
  tagline: "Run your hostel. Not your paperwork.",
  title: "Hostel & PG Management Software",
  description:
    "Organize hostel and PG operations with a clearer view of occupancy, rent payments, tenant records, and everyday property management.",
  nav: [
    { label: "Product", href: "#platform" },
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Contact", href: "#early-access" },
  ],
  primaryCta: { label: "Get early access", href: "#early-access" },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  submitLabel: "Request early access",
  social: [] as { label: string; href: string }[], // none exist; do not invent
  logo: null, // text wordmark until a logo is supplied
} as const;

export type NavLink = { label: string; href: string };

/** Contact details exist only when configured; never placeholders. */
export function getContact() {
  const { contactEmail, contactPhone } = getPublicEnv();
  return { email: contactEmail, phone: contactPhone };
}
