import { content } from "@/config/site-content";
import { Icon } from "@/components/ui/Icon";

/**
 * Homepage FAQ Section
 * - 5 confident, factually correct items
 * - All exist and work today (rooms/beds/rent/complaints/leave/visitors/maintenance)
 * - Confirms owners manage multiple properties from one account
 * - Confirms online rent payment is live via Razorpay
 * - Zero hedging, zero "isn't available yet"
 * - Native accessible <details>/<summary> with smooth chevron rotation
 * - Tokens-only, rename-safe
 */
export function Faq() {
  const { faq } = content;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 md:py-24 bg-canvas border-b border-line"
    >
      <div className="container-page max-w-4xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            {faq.eyebrow}
          </span>

          <h2
            id="faq-heading"
            className="mt-4 font-heading text-h2 font-medium tracking-tight text-espresso"
          >
            {faq.title}
          </h2>

          <p className="mt-3 font-body text-lead text-dust">{faq.lead}</p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-4">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="card group rounded-card border border-line bg-cream p-5 md:p-6 shadow-sm transition-all duration-(--dur-ui) ease-standard hover:shadow-card open:shadow-card"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-heading text-h3 text-espresso [&::-webkit-details-marker]:hidden">
                <span className="text-[1.125rem] md:text-[1.25rem] font-medium leading-snug">
                  {item.q}
                </span>
                <span className="flex size-8 flex-none items-center justify-center rounded-btn bg-sand text-bark transition-transform duration-(--dur-ui) ease-standard group-open:rotate-180 group-open:bg-clay-100 group-open:text-clay-600">
                  <Icon name="chevronDown" size={18} />
                </span>
              </summary>

              <div className="mt-4 pt-4 border-t border-line/60 font-body text-body text-bark leading-relaxed">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
