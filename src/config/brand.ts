import { getPublicEnv } from "@/lib/env";

export type NavLink = { label: string; href: string };

/**
 * Single source of brand identity for StayPookie.
 * Copy voice: Confident, present-tense, owner-focused.
 */
export const brand = {
  name: "StayPookie",
  companyName: "StayPookie Technologies Pvt. Ltd.",
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
  contactPlaceholder: {
    email: "hello@staypookie.com",
    phone: "+91 98765 43210",
  },
  social: [] as { label: string; href: string }[],
  logo: null,
} as const;

/** Contact details return configured env vars or official placeholder values. */
export function getContact() {
  const { contactEmail, contactPhone } = getPublicEnv();
  return {
    email: contactEmail || brand.contactPlaceholder.email,
    phone: contactPhone || brand.contactPlaceholder.phone,
  };
}
