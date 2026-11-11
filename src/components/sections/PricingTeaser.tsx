import { content } from "@/config/site-content";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Homepage Pricing Teaser Section
 * - Compact 3-card summary:
 *   - Starter: ₹1,999/mo (one line)
 *   - Growth: ₹4,999/mo (marked "Most Popular", one line)
 *   - Portfolio: ₹14,999/mo (one line)
 * - "View full plans" CTA -> /pricing
 * - Does NOT repeat the full feature comparison here
 * - Pure tokens-only (no raw hex codes, rename-safe)
 */
export function PricingTeaser() {
  const { pricingTeaser } = content;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-teaser-heading"
      className="py-16 md:py-24 bg-canvas-sand/30 border-b border-line"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            {pricingTeaser.eyebrow}
          </span>

          <h2
            id="pricing-teaser-heading"
            className="mt-4 font-heading text-h2 font-medium tracking-tight text-espresso"
          >
            {pricingTeaser.title}
          </h2>

          <p className="mt-3 font-body text-lead text-dust max-w-xl mx-auto">
            {pricingTeaser.lead}
          </p>
        </div>

        {/* Compact 3-Card Summary Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {pricingTeaser.plans.map((plan) => (
            <div
              key={plan.id}
              className={[
                "card relative flex flex-col justify-between p-6 md:p-8 bg-cream transition-all duration-(--dur-ui) ease-standard hover:-translate-y-1",
                plan.popular
                  ? "border-clay-600 shadow-card-hover"
                  : "shadow-card hover:shadow-card-hover",
              ].join(" ")}
            >
              {plan.popular ? (
                <div className="absolute -top-3.5 right-6">
                  <span className="tag tag-attention font-semibold">
                    Most Popular
                  </span>
                </div>
              ) : null}

              <div>
                <span
                  className={plan.popular ? "tag tag-success" : "tag tag-info"}
                >
                  {plan.name}
                </span>

                <h3 className="mt-4 font-heading text-h3 font-medium text-espresso">
                  {plan.name} Plan
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-[2.25rem] font-medium text-espresso">
                    {plan.price}
                  </span>
                  <span className="font-body text-small text-dust">
                    {plan.cadence}
                  </span>
                </div>

                <p className="mt-4 font-body text-body text-bark leading-relaxed border-t border-line/60 pt-4">
                  {plan.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <span className="font-body text-caption text-dust font-medium block">
                  Includes dedicated team onboarding setup
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Plans CTA */}
        <div className="mt-12 text-center">
          <ButtonLink
            href={pricingTeaser.cta.href}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto font-medium"
          >
            {pricingTeaser.cta.label}
          </ButtonLink>
          <p className="mt-3 font-body text-caption text-dust">
            Compare bed limits, staff roles, and feature sets in detail
          </p>
        </div>
      </div>
    </section>
  );
}
