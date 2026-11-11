import { brand } from "@/config/brand";
import { flags } from "@/config/flags";

export type ReviewStatus = "draft" | "reviewed";

type LegalSection = { heading: string; body: string[] };

const name = brand.name;

export const legal = {
  privacy: {
    reviewStatus: "draft" as ReviewStatus,
    title: "Privacy Policy",
    intro: `This Privacy Policy outlines how ${name} handles customer and operational data when you visit our website, subscribe to a plan, or use our property management platform.`,
    sections: [
      {
        heading: "1. Information We Collect",
        body: [
          "When you choose a plan, submit an inquiry, or complete assisted checkout, we collect buyer contact details including your full name, email address, mobile number, property or organization name, number of managed properties, and city.",
          "During assisted account setup, our team receives building layout data, room numbers, sharing types, agreed rental rates, and resident rosters provided directly by you.",
          "We do not collect unnecessary personal identity papers or raw banking passwords through this marketing site. Online subscription payments are processed securely via Razorpay.",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: [
          `We use collected information solely to provision and configure your ${name} instance, generate automated rent ledgers, deliver login credentials within 24 hours, and provide ongoing operational support.`,
          "We do not sell, rent, or trade your personal or business data to advertisers or third-party brokers under any circumstances.",
        ],
      },
      {
        heading: "3. Data Security & Storage",
        body: [
          "All data transmissions are encrypted using standard SSL/TLS protocols. Access to customer management records is restricted to authorized operations specialists responsible for configuring your property.",
          "Data is retained for the active duration of your paid subscription and archived in compliance with applicable commercial and tax regulations in India.",
        ],
      },
      {
        heading: "4. Cookies & Analytics",
        body: [
          "With your permission we use Google Analytics to count visits and see which pages are useful. No analytics code is loaded and no analytics cookie is set unless you choose Accept on the cookie banner. You can change your choice at any time with the Cookie settings link in the footer.",
          "When you pay, Razorpay may set its own cookies to process and secure the payment. We do not control these.",
        ],
      },
      {
        heading: "5. Contacting Us",
        body: [
          `If you have questions regarding this Privacy Policy or wish to request data updates, please contact our team at ${brand.contact.email}.`,
        ],
      },
    ] satisfies LegalSection[],
    contactHeading: "Contacting us regarding your privacy",
    contactWithEmail:
      "To update your details, request data access, or submit questions about this privacy notice, contact us at",
    contactMissing: `For privacy inquiries, please contact our support team at ${brand.contact.email}.`,
  },

  terms: {
    reviewStatus: "draft" as ReviewStatus,
    title: "Terms of Service",
    intro: `These Terms of Service govern your purchase, subscription, and use of ${name}.`,
    sections: [
      {
        heading: "1. Services & Assisted Onboarding",
        body: [
          `${name} provides hostel and paying guest (PG) management software for property owners and managers across India.`,
          "All plans are paid monthly subscriptions. There is no self-serve account registration; upon plan selection and payment, our operations team manually configures your room matrices, bed allocations, and staff permissions within 24 hours.",
        ],
      },
      {
        heading: "2. Subscription & Billing",
        body: [
          flags.showPricing
            ? "Subscription fees are billed monthly in advance for the selected tier (Starter ₹1,999/mo, Growth ₹4,999/mo, or Portfolio ₹14,999/mo)."
            : "Subscription fees are billed monthly in advance for the selected tier. Current pricing is shared directly during onboarding.",
          "A payment receipt is issued for every monthly billing cycle.",
        ],
      },
      {
        heading: "3. User Responsibilities & Data Accuracy",
        body: [
          "You are responsible for maintaining the confidentiality of your administrative credentials and for ensuring the accuracy of room rates, resident records, and rent dues managed through your property profile.",
          "You agree not to use the platform for unlawful purposes or to violate resident privacy regulations.",
        ],
      },
      {
        heading: "4. Account Cancellation & Termination",
        body: [
          "You may cancel your monthly subscription at any time prior to the next billing date by contacting our support team. Upon cancellation, your account remains accessible through the end of the current paid billing cycle.",
        ],
      },
    ] satisfies LegalSection[],
    body: [
      `${name} is a hostel and PG management platform for owners and property operators across India.`,
      "All subscriptions are paid plans. There is no self-serve account creation; upon plan selection and payment, our team personally sets up and configures your property account.",
      "You are responsible for ensuring the accuracy of tenant records and rent data managed through your property profile.",
      "For questions regarding our service agreements, contact our team directly.",
    ],
  },

  refund: {
    reviewStatus: "draft" as ReviewStatus,
    title: "Refund & Cancellation Policy",
    intro: `This Refund and Cancellation Policy applies to all subscription plan purchases made on staypookie.com.`,
    sections: [
      {
        heading: "1. Subscription Billing & Cancellation",
        body: [
          `${name} subscriptions (Starter, Growth, Portfolio) are billed monthly in advance via Razorpay.`,
          "You can cancel your monthly subscription at any time. When you cancel, future automatic renewals stop immediately, and you retain full system access until the end of your current prepaid billing month.",
        ],
      },
      {
        heading: "2. Assisted Onboarding Setup & Refund Eligibility",
        body: [
          "Because every subscription includes dedicated manual setup by our operations team (configuring room grids, bed matrices, rates, and resident records within 24 hours), subscription payments cover active operational provisioning.",
          "Cancellation before onboarding setup: If you request cancellation within 12 hours of purchase and before our team has begun configuring your property instance, you are eligible for a 100% full refund.",
          "Once account provisioning has begun or login credentials have been issued, monthly subscription fees are non-refundable. We do not provide prorated refunds for partial month usage.",
        ],
      },
      {
        heading: "3. Refund Processing Timeline",
        body: [
          "Approved refund requests are initiated within 2 business days and credited back to the original payment method (UPI, net banking, or debit/credit card via Razorpay) within 5 to 7 business days, depending on your bank.",
        ],
      },
      {
        heading: "4. Requesting a Refund or Cancellation",
        body: [
          `To submit a refund or cancellation request, please email ${brand.contact.email} with your order confirmation and registered phone number.`,
        ],
      },
    ] satisfies LegalSection[],
    body: [
      `At ${name}, we are dedicated to providing seamless management tools for hostel and PG operators.`,
      "Because our onboarding team undertakes dedicated setup work for each property upon subscription confirmation, subscription fees are generally non-refundable once your property configuration has begun.",
      "If you need to cancel a purchase before onboarding starts, contact our support team within 24 hours of purchase for a full refund to your original payment method.",
      "Refund requests are processed within 5 to 7 business days following verification.",
    ],
  },

  draftNotice: "placeholder — needs legal review before launch.",
} as const;
