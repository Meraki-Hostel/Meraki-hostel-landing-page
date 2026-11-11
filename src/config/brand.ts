import { getPublicEnv } from "@/lib/env";

export type NavLink = { label: string; href: string };

/**
 * Single source of brand identity for StayPookie.
 * Copy voice: Confident, present-tense, owner-focused.
 */
export const brand = {
  name: "StayPookie",
  tagline: "Run your hostel. Not your paperwork.",
  title: "Hostel & PG Management Software for India",
  description:
    "StayPookie gives hostel and PG owners across India complete control of occupancy, rent records, tenant profiles, and day-to-day operations.",
  domain: "staypookie.com",
  nav: [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "How it Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const satisfies readonly NavLink[],
  primaryCta: {
    label: "See Plans",
    href: "/pricing",
  } as const satisfies NavLink,
  secondaryCta: {
    label: "How it Works",
    href: "#how-it-works",
  } as const satisfies NavLink,
  submitLabel: "Choose Plan",
  footerLegal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "FAQ", href: "/#faq" },
  ] as const satisfies readonly NavLink[],
  /** Real, live contact details — not placeholders. */
  contact: {
    email: "hello@staypookie.com",
  },
  social: [] as { label: string; href: string }[],
} as const;

/** Contact details: the configured email (or the real mailbox above) and a
 * phone number only when NEXT_PUBLIC_CONTACT_PHONE is set. There is no
 * fallback number — a fake one must never reach visitors. */
export function getContact(): { email: string; phone: string | undefined } {
  const { contactEmail, contactPhone } = getPublicEnv();
  return {
    email: contactEmail || brand.contact.email,
    phone: contactPhone || undefined,
  };
}
