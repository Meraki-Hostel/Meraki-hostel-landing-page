import { brand } from "@/config/brand";

// Draft legal copy (owner decision D-6). Not reviewed, not legal advice.
// Set privacy.reviewStatus to "reviewed" only after the owner/legal review:
// it is one of the three conditions that switch lead capture on (specs/03 §9.4).

export type ReviewStatus = "draft" | "reviewed";

type LegalSection = { heading: string; body: string[] };

const name = brand.name;

export const legal = {
  privacy: {
    reviewStatus: "draft" as ReviewStatus,
    title: "Privacy notice for early-access requests",
    intro: `This notice explains what happens to the details you share through the ${name} early-access form.`,
    sections: [
      {
        heading: "What we collect",
        body: [
          "Your name, your property or business name, a mobile number and/or an email address, your city, the approximate number of beds, optionally the number of properties you run, and optionally a short note about your biggest operational challenge.",
          "We do not ask for ID numbers, Aadhaar, addresses or payment details.",
        ],
      },
      {
        heading: "Why we collect it",
        body: [
          `Only to review your early-access request and to contact you about ${name} early access. We do not use it for anything else and we do not sell it.`,
        ],
      },
      {
        heading: "Your consent",
        body: [
          "We collect these details only when you tick the consent box and send the form. Ticking the box is voluntary, it is never pre-ticked, and you can withdraw your consent at any time using the contact below.",
        ],
      },
      {
        heading: "Who processes it",
        body: [
          `Requests are stored by a service chosen by the ${name} team to hold early-access requests. That service will be named here before the form is switched on.`,
          "The website's hosting provider processes your IP address briefly to deliver pages and to limit abuse of the form. The site itself does not store your IP address.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "A retention period has not been decided yet. It will be stated here before the form is switched on.",
        ],
      },
    ] satisfies LegalSection[],
    contactHeading: "Withdrawing consent and contacting us",
    contactWithEmail:
      "To withdraw your consent, ask what we hold about you, or ask us to correct or erase it, email",
    contactMissing:
      "A contact address for privacy requests will be published here before the form is switched on. Until then, the form does not accept submissions.",
  },
  terms: {
    reviewStatus: "draft" as ReviewStatus,
    title: "Terms of service",
    body: [
      `${name} is not available yet, so there are no terms of service for using it.`,
      "Terms will be published here before the product becomes available. Requesting early access does not create an account or any agreement to use the product.",
    ],
  },
  draftNotice:
    "Draft — pending review. This text has not been reviewed by the owner or a legal adviser and is not final.",
} as const;
