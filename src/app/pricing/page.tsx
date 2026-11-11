import { pageMetadata } from "@/lib/metadata";
import { getContact } from "@/config/brand";
import { flags, pricingFallbackLabel } from "@/config/flags";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Pricing Plans",
  description:
    "Predictable, transparent subscription plans for hostel and PG owners across India. 3 tiers with assisted onboarding within 24 hours.",
  path: "/pricing",
});

type PlanDefinition = {
  id: "starter" | "growth" | "portfolio";
  name: string;
  badge?: string;
  price: string;
  cadence: string;
  popular?: boolean;
  limits: {
    properties: string;
    beds: string;
    staff: string;
  };
  features: string[];
  ctaLabel: string;
  checkoutHref: string;
};

const plans: readonly PlanDefinition[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹1,999",
    cadence: "/ month",
    limits: {
      properties: "2 properties",
      beds: "120 beds",
      staff: "10 staff",
    },
    features: [
      "Rooms/beds/students",
      "Rent ledger & receipts",
      "Complaints & notices",
    ],
    ctaLabel: "Choose Starter",
    checkoutHref: "/checkout?plan=starter",
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    popular: true,
    price: "₹4,999",
    cadence: "/ month",
    limits: {
      properties: "6 properties",
      beds: "400 beds",
      staff: "40 staff",
    },
    features: [
      "Everything in Starter",
      "Leave/visitor management",
      "Maintenance/inventory",
      "Owner analytics",
    ],
    ctaLabel: "Choose Growth",
    checkoutHref: "/checkout?plan=growth",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    price: "₹14,999",
    cadence: "/ month",
    limits: {
      properties: "25 properties",
      beds: "2,500 beds",
      staff: "250 staff",
    },
    features: [
      "Everything in Growth",
      "Online rent collection",
      "Priority support",
    ],
    ctaLabel: "Choose Portfolio",
    checkoutHref: "/checkout?plan=portfolio",
  },
];

type ComparisonRow = {
  label: string;
  detail?: string;
  starter: string | boolean;
  growth: string | boolean;
  portfolio: string | boolean;
};

type ComparisonCategory = {
  category: string;
  rows: ComparisonRow[];
};

const comparisonCategories: readonly ComparisonCategory[] = [
  {
    category: "Scale & Capacity",
    rows: [
      {
        label: "Properties managed",
        detail: "Separate physical buildings or PG locations",
        starter: "2 properties",
        growth: "6 properties",
        portfolio: "25 properties",
      },
      {
        label: "Bed capacity",
        detail: "Total bookable resident beds",
        starter: "120 beds",
        growth: "400 beds",
        portfolio: "2,500 beds",
      },
      {
        label: "Staff logins",
        detail: "Wardens, managers, and operational staff",
        starter: "10 staff",
        growth: "40 staff",
        portfolio: "250 staff",
      },
    ],
  },
  {
    category: "Rooms, Beds & Rent",
    rows: [
      {
        label: "Rooms, beds & student directory",
        detail: "Single, double, triple, and dorm room matrices",
        starter: true,
        growth: true,
        portfolio: true,
      },
      {
        label: "Rent ledger & automated PDF receipts",
        detail: "Due reminders, payment logging, and downloadable receipts",
        starter: true,
        growth: true,
        portfolio: true,
      },
      {
        label: "Complaints & notices",
        detail: "In-app ticket tracking and broadcast notice board",
        starter: true,
        growth: true,
        portfolio: true,
      },
      {
        label: "Advance deposit & refund tracking",
        detail: "Security deposits logged with refund records",
        starter: true,
        growth: true,
        portfolio: true,
      },
    ],
  },
  {
    category: "Operations & Logistics",
    rows: [
      {
        label: "Leave & visitor management",
        detail: "Digital out-passes, gate sign-ins, and curfew logs",
        starter: false,
        growth: true,
        portfolio: true,
      },
      {
        label: "Maintenance & inventory",
        detail: "Room asset registry and scheduled servicing checklists",
        starter: false,
        growth: true,
        portfolio: true,
      },
      {
        label: "Owner analytics",
        detail: "Portfolio-wide collection rates, dues, and occupancy trends",
        starter: false,
        growth: true,
        portfolio: true,
      },
      {
        label: "Online rent collection",
        detail: "Razorpay integration for UPI, card, and net-banking dues",
        starter: false,
        growth: false,
        portfolio: true,
      },
    ],
  },
  {
    category: "Onboarding & Support",
    rows: [
      {
        label: "Assisted account setup",
        detail: "Our team configures rooms, rates, and tenant profiles",
        starter: "Within 24 hours",
        growth: "Within 24 hours",
        portfolio: "Within 24 hours",
      },
      {
        label: "Support channel",
        detail: "Direct operational assistance for you and your staff",
        starter: "Email & WhatsApp",
        growth: "Priority WhatsApp & Email",
        portfolio: "Priority support (Phone & Dedicated rep)",
      },
    ],
  },
];

export default function PricingPage() {
  const contact = getContact();

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            {flags.showPricing ? "Transparent Pricing" : "Flexible Plans"}
          </span>

          <h1 className="mt-4 font-heading text-h1 font-medium tracking-tight text-espresso leading-[1.1]">
            Simple plans tailored for your property size.
          </h1>

          <p className="mt-4 font-body text-lead text-bark leading-relaxed">
            There is no self-serve account confusion. Choose the plan that fits
            your bed count, and our team sets up your account and emails your
            login within 24 hours.
          </p>
        </div>

        {/* 3-Tier Pricing Cards Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={[
                "card relative flex flex-col justify-between p-6 md:p-8 bg-cream transition-all duration-(--dur-ui) ease-standard hover:-translate-y-1",
                plan.popular
                  ? "border-clay-600 shadow-dropdown ring-1 ring-clay-600"
                  : "shadow-card hover:shadow-card-hover",
              ].join(" ")}
            >
              {plan.badge ? (
                <div className="absolute -top-3.5 right-6">
                  <span className="tag tag-attention font-semibold">
                    {plan.badge}
                  </span>
                </div>
              ) : null}

              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={
                      plan.popular ? "tag tag-success" : "tag tag-info"
                    }
                  >
                    {plan.name}
                  </span>
                </div>

                <h2 className="mt-4 font-heading text-h2 font-medium text-espresso">
                  {plan.name}
                </h2>

                <div className="mt-4 flex items-baseline gap-1">
                  {flags.showPricing ? (
                    <>
                      <span className="font-heading text-price font-medium text-espresso leading-none">
                        {plan.price}
                      </span>
                      <span className="font-body text-small text-dust">
                        {plan.cadence}
                      </span>
                    </>
                  ) : (
                    <span className="font-heading text-h3 font-medium text-espresso">
                      {pricingFallbackLabel}
                    </span>
                  )}
                </div>

                {/* Capacity Limits Badge Box */}
                <div className="mt-6 rounded-btn border border-line/80 bg-sand/40 p-3.5">
                  <div className="font-body text-caption font-semibold uppercase tracking-wider text-bark">
                    Capacity limits
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded bg-cream p-1.5 border border-line/60">
                      <span className="block font-heading text-body font-semibold text-espresso">
                        {plan.limits.properties.split(" ")[0]}
                      </span>
                      <span className="block font-body text-micro text-dust">
                        Properties
                      </span>
                    </div>
                    <div className="rounded bg-cream p-1.5 border border-line/60">
                      <span className="block font-heading text-body font-semibold text-espresso">
                        {plan.limits.beds.split(" ")[0]}
                      </span>
                      <span className="block font-body text-micro text-dust">
                        Beds
                      </span>
                    </div>
                    <div className="rounded bg-cream p-1.5 border border-line/60">
                      <span className="block font-heading text-body font-semibold text-espresso">
                        {plan.limits.staff.split(" ")[0]}
                      </span>
                      <span className="block font-body text-micro text-dust">
                        Staff
                      </span>
                    </div>
                  </div>
                </div>

                {/* Core Features List */}
                <div className="mt-6 border-t border-line/60 pt-6">
                  <span className="font-body text-caption font-semibold uppercase tracking-wider text-dust block mb-3">
                    Features included
                  </span>
                  <ul className="space-y-3 font-body text-small text-bark">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-moss/10 text-moss font-bold text-micro">
                          ✓
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-line/60">
                <ButtonLink
                  href={plan.checkoutHref}
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full justify-center"
                >
                  {plan.ctaLabel}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        {/* Below Cards: Plain "Need something different? Talk to us" link to Contact & Trust line */}
        <div className="mt-10 text-center">
          <p className="font-body text-body text-dust">
            Need something different?{" "}
            <a
              href="#contact"
              className="font-semibold text-clay-600 underline underline-offset-4 hover:text-clay-700 transition-colors"
            >
              Talk to us
            </a>
          </p>

          <p className="mt-3 font-body text-small text-bark font-medium max-w-xl mx-auto">
            After payment, our team sets up your account and emails your login
            within 24 hours.
          </p>
        </div>

        {/* Full 3-Tier Comparison Matrix */}
        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
              <span className="size-1.5 rounded-full bg-clay-600" />
              Side-by-Side Breakdown
            </span>
            <h2 className="mt-4 font-heading text-h2 font-medium tracking-tight text-espresso">
              Full 3-Tier Feature Comparison
            </h2>
            <p className="mt-3 font-body text-lead text-dust">
              Compare limits and capabilities across all plans.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-card border border-line bg-cream shadow-card">
            <table className="w-full border-collapse text-left font-body">
              <thead>
                <tr className="border-b border-line bg-sand/40">
                  <th className="p-4 md:p-6 font-heading text-h4 font-medium text-espresso min-w-[240px]">
                    Plan Features
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      className={[
                        "p-4 md:p-6 min-w-[180px] text-center",
                        p.popular ? "bg-sand/70 font-semibold" : "",
                      ].join(" ")}
                    >
                      <div className="font-heading text-h4 font-medium text-espresso">
                        {p.name}
                      </div>
                      {flags.showPricing ? (
                        <div className="mt-1 font-heading text-lead font-semibold text-clay-600">
                          {p.price}
                          <span className="font-body text-caption text-dust font-normal">
                            /mo
                          </span>
                        </div>
                      ) : (
                        <div className="mt-1 font-heading text-lead font-semibold text-clay-600">
                          {pricingFallbackLabel}
                        </div>
                      )}
                      <div className="mt-4">
                        <ButtonLink
                          href={p.checkoutHref}
                          variant={p.popular ? "primary" : "outline"}
                          size="md"
                          className="w-full justify-center text-caption py-1.5"
                        >
                          {p.ctaLabel}
                        </ButtonLink>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((group) => (
                  <tr key={group.category} className="contents">
                    <tr className="border-y border-line bg-sand/20">
                      <th
                        colSpan={4}
                        className="p-3 md:px-6 font-body text-caption font-semibold uppercase tracking-wider text-dust"
                      >
                        {group.category}
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-line/60 hover:bg-sand/10 transition-colors"
                      >
                        <td className="p-4 md:px-6">
                          <div className="font-medium text-espresso text-small">
                            {row.label}
                          </div>
                          {row.detail ? (
                            <div className="font-body text-caption text-dust mt-0.5">
                              {row.detail}
                            </div>
                          ) : null}
                        </td>
                        {(["starter", "growth", "portfolio"] as const).map(
                          (planKey) => {
                            const val = row[planKey];
                            const isPop = planKey === "growth";
                            return (
                              <td
                                key={planKey}
                                className={[
                                  "p-4 text-center text-small",
                                  isPop ? "bg-sand/30 font-medium" : "",
                                ].join(" ")}
                              >
                                {typeof val === "boolean" ? (
                                  val ? (
                                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-moss/10 text-moss font-bold text-small">
                                      ✓
                                    </span>
                                  ) : (
                                    <span className="inline-flex size-6 items-center justify-center text-dust/60 text-small">
                                      —
                                    </span>
                                  )
                                ) : (
                                  <span className="font-medium text-espresso">
                                    {val}
                                  </span>
                                )}
                              </td>
                            );
                          },
                        )}
                      </tr>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Onboarding Trust Banner */}
        <div className="mt-16 rounded-card border border-line bg-sand/50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-tag bg-cream px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
                <span className="size-1.5 rounded-full bg-moss" />
                Guaranteed Onboarding
              </span>
              <h3 className="mt-3 font-heading text-h3 font-medium text-espresso">
                After payment, our team sets up your account and emails your
                login within 24 hours.
              </h3>
              <p className="mt-2 font-body text-small text-bark leading-relaxed">
                You do not need to build room grids or configure database tables
                yourself. Once you choose a plan and complete payment, our
                onboarding specialist contacts you directly to collect your
                building floor plans, sharing formats, and resident roster. Your
                system is handed over completely ready for day-to-day
                operations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {contact.phone ? (
                <a
                  href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                  className="btn btn-outline"
                >
                  <Icon name="phone" size={16} />
                  <span>Questions? Call us</span>
                </a>
              ) : (
                <ButtonLink href="/contact" variant="outline">
                  <Icon name="mail" size={16} />
                  <span>Questions? Contact us</span>
                </ButtonLink>
              )}
              <ButtonLink href="/checkout?plan=growth" variant="primary">
                Choose Growth
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
