import { content } from "@/config/site-content";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Homepage How It Works Section
 * - 4 Steps:
 *   1. Add your property
 *   2. Invite staff & residents
 *   3. Billing and requests run themselves
 *   4. See everything in one place
 * - Outcome first, mechanism clear
 * - Ends with a prominent CTA to Pricing (/pricing)
 * - Pure tokens-only (no raw hex codes, rename-safe)
 */
export function HowItWorks() {
  const { howItWorks } = content;

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="py-16 md:py-24 bg-canvas border-b border-line"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            {howItWorks.eyebrow}
          </span>

          <h2
            id="how-it-works-heading"
            className="mt-4 font-heading text-h2 font-medium tracking-tight text-espresso"
          >
            {howItWorks.title}
          </h2>

          <p className="mt-4 font-body text-lead text-dust leading-relaxed max-w-2xl mx-auto">
            {howItWorks.lead}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((item, index) => (
            <div
              key={item.step}
              className="card relative flex flex-col justify-between p-6 md:p-7 shadow-card transition-all duration-(--dur-ui) ease-standard hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div>
                {/* Step indicator header */}
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-btn bg-clay-100 font-heading text-h3 font-medium text-clay-600 shadow-xs">
                    {item.step}
                  </div>
                  <span className="tag tag-info text-[0.7rem] px-2 py-0.5">
                    {item.tag}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="mt-5 font-heading text-h3 font-medium text-espresso leading-snug">
                  {item.title}
                </h3>

                {/* Outcome Statement (Outcome First) */}
                <p className="mt-2.5 font-body text-body font-medium text-clay-600">
                  {item.outcome}
                </p>

                {/* Description */}
                <p className="mt-3 font-body text-small text-bark leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Progress connector indicator */}
              <div className="mt-6 pt-3.5 border-t border-line/60 flex items-center justify-between text-caption text-dust font-medium">
                <span>Step {index + 1} of 4</span>
                <Icon name={item.icon} size={16} className="text-dust" />
              </div>
            </div>
          ))}
        </div>

        {/* Closing Call to Action to Pricing */}
        <div className="mt-14 mx-auto max-w-3xl rounded-card border border-line bg-sand/50 p-8 text-center shadow-sm">
          <h3 className="font-heading text-h3 font-medium text-espresso">
            Ready to experience calm property management?
          </h3>
          <p className="mt-2 font-body text-body text-dust max-w-xl mx-auto">
            Choose your plan now. Our team connects with you within 2 hours to
            configure your property so you start operational on day one.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <ButtonLink
              href="/pricing"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-medium"
            >
              See Plans & Pricing
            </ButtonLink>
            <ButtonLink
              href="#contact"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-medium"
            >
              Talk to Setup Team
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
