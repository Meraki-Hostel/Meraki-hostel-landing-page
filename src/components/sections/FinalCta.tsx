import { content } from "@/config/site-content";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Homepage Final CTA Section
 * - One line restating the outcome
 * - One button -> Pricing (/pricing)
 * - No new information
 * - Pure tokens-only (no raw hex codes, rename-safe)
 */
export function FinalCta() {
  const { finalCta } = content;

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="py-20 md:py-28 bg-canvas text-center"
    >
      <div className="container-page max-w-4xl">
        <div className="card rounded-card border border-line bg-cream p-8 md:p-14 shadow-dropdown text-center">
          {/* One line restating the outcome */}
          <h2
            id="final-cta-heading"
            className="font-heading text-h2 md:text-[2.75rem] font-medium tracking-tight text-espresso leading-[1.15] max-w-2xl mx-auto"
          >
            {finalCta.headline}
          </h2>

          {/* One button -> Pricing */}
          <div className="mt-8 flex justify-center">
            <ButtonLink
              href={finalCta.cta.href}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-medium"
            >
              {finalCta.cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
