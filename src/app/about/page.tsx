import type { Metadata } from "next";
import { brand, getContact } from "@/config/brand";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "About",
  description: `What ${brand.name} is, who it is for, and how our assisted property management model works across India.`,
};

export default function AboutPage() {
  const contact = getContact();

  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-page max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            About {brand.name}
          </span>

          <h1 className="mt-4 font-heading text-h1 font-medium tracking-tight text-espresso leading-[1.1]">
            Hostel & PG management software built for how Indian properties
            actually run.
          </h1>

          <p className="mt-4 font-body text-lead text-bark leading-relaxed max-w-3xl">
            {brand.name} is a live property management SaaS for hostel and PG
            owners across India. It unifies room inventory, monthly rent
            records, resident requests, and on-ground staff duties into one
            organized system.
          </p>
        </div>

        {/* Section 1: What StayPookie is */}
        <section aria-labelledby="what-is-heading" className="mt-14 space-y-4">
          <h2
            id="what-is-heading"
            className="font-heading text-h2 font-medium text-espresso"
          >
            What {brand.name} is
          </h2>
          <p className="font-body text-body text-bark leading-relaxed">
            Running a hostel or PG in India involves unique day-to-day
            realities: varied sharing formats (single, double, triple, dorm),
            split security deposits, month-start collection rushes, night-out
            curfew approvals, and high tenant turnover.
          </p>
          <p className="font-body text-body text-bark leading-relaxed">
            {brand.name} replaces scattered WhatsApp groups, paper registers,
            and personal UPI screenshot matching with a purpose-built platform.
            Every room and bed is accounted for, monthly rent cycles generate
            automatically, payments are logged with verified timestamps and PDF
            receipts, and daily operations stay calm.
          </p>
        </section>

        {/* Section 2: Who it's for */}
        <section aria-labelledby="who-heading" className="mt-14">
          <h2
            id="who-heading"
            className="font-heading text-h2 font-medium text-espresso"
          >
            Who it&apos;s for
          </h2>
          <p className="mt-3 font-body text-lead text-dust">
            {brand.name} serves every tier of your property organization with
            strictly scoped role access:
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Owner */}
            <div className="card p-6 bg-cream shadow-card">
              <span className="tag tag-info">Owners</span>
              <h3 className="mt-3 font-heading text-h3 font-medium text-espresso">
                Hostel & PG Owners
              </h3>
              <p className="mt-2 font-body text-small text-dust leading-relaxed">
                For independent owners and portfolio operators running 1 to 25+
                properties who need complete financial oversight, collection
                rates, and real-time vacant bed counts without walking
                corridors.
              </p>
            </div>

            {/* Wardens */}
            <div className="card p-6 bg-cream shadow-card">
              <span className="tag tag-attention">Managers</span>
              <h3 className="mt-3 font-heading text-h3 font-medium text-espresso">
                Wardens & Managers
              </h3>
              <p className="mt-2 font-body text-small text-dust leading-relaxed">
                For on-ground property staff who manage daily check-ins, resolve
                maintenance tickets, review digital leave requests, log gate
                visitors, and coordinate room cleaning.
              </p>
            </div>

            {/* Residents */}
            <div className="card p-6 bg-cream shadow-card">
              <span className="tag tag-success">Residents</span>
              <h3 className="mt-3 font-heading text-h3 font-medium text-espresso">
                Students & Residents
              </h3>
              <p className="mt-2 font-body text-small text-dust leading-relaxed">
                For residents who need transparent dues visibility, online rent
                payment via Razorpay with automated receipts, repair request
                tracking, and digital out-passes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: The Assisted Onboarding Model */}
        <section
          aria-labelledby="model-heading"
          className="mt-14 rounded-card border border-line bg-sand/40 p-6 md:p-8"
        >
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-cream px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-moss" />
            Our Operating Model
          </span>

          <h2
            id="model-heading"
            className="mt-3 font-heading text-h3 font-medium text-espresso"
          >
            Zero self-serve configuration headaches
          </h2>

          <p className="mt-2 font-body text-body text-bark leading-relaxed">
            There is no self-serve account setup on {brand.name}. Property
            databases and room sharing hierarchies are too important to leave to
            generic DIY setup forms.
          </p>

          <p className="mt-3 font-body text-body text-bark leading-relaxed">
            When you choose a paid plan, our operations team manually configures
            your room matrix, sharing formats, and resident records. We deliver
            ready-to-use logins to you and your wardens within 24 hours of
            purchase, so you start on day one without manual data entry.
          </p>
        </section>

        {/* Section 4: Contact & Operating Details */}
        <section
          aria-labelledby="company-heading"
          className="mt-14 border-t border-line/60 pt-8"
        >
          <h2
            id="company-heading"
            className="font-heading text-h4 font-medium text-espresso"
          >
            Contact & Operating Details
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 font-body text-small text-bark">
            <div>
              <span className="font-semibold text-espresso block">
                Primary Contact Email
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-clay-600 underline"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <span className="font-semibold text-espresso block">
                Support Phone & WhatsApp
              </span>
              <a
                href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                className="text-clay-600 underline"
              >
                {contact.phone}
              </a>
            </div>
            <div>
              <span className="font-semibold text-espresso block">
                Operating Market
              </span>
              <span>Hostels & Paying Guest accommodations across India</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/pricing" variant="primary">
              View Plans & Pricing
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              <Icon name="mail" size={16} />
              <span>Contact Us</span>
            </ButtonLink>
          </div>
        </section>
      </div>
    </div>
  );
}

