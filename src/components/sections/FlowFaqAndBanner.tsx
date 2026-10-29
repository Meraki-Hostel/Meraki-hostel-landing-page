import { brand } from "@/config/brand";
import { content } from "@/config/site-content";

export function FlowFaqAndBanner() {
  const { title, items } = content.faq;

  return (
    <section id="faq" className="bg-canvas pb-20 md:pb-28">
      <div className="container-page">
        {/* Still wondering pre-footer banner matching Flow screenshot */}
        <div className="relative mb-20 overflow-hidden rounded-[2.5rem] border border-line bg-surface p-8 shadow-sm md:p-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="font-display text-h3 text-ink">
                Still wondering? Explore {brand.name} during early access
              </h3>
              <p className="mt-2 text-body text-ink-muted">
                Free during preview &middot; Guided personal onboarding &middot;
                Zero credit card needed
              </p>

              {/* 3 Pills */}
              <div className="mt-6 flex flex-wrap gap-2.5 justify-center md:justify-start">
                <a
                  href={brand.primaryCta.href}
                  className="rounded-full bg-lilac px-4 py-2 text-caption font-medium text-lilac-ink shadow-2xs hover:bg-lilac-tint transition"
                >
                  For Single PGs
                </a>
                <a
                  href={brand.primaryCta.href}
                  className="rounded-full bg-lilac px-4 py-2 text-caption font-medium text-lilac-ink shadow-2xs hover:bg-lilac-tint transition"
                >
                  For Multi-Branch Hostels
                </a>
                <a
                  href={brand.primaryCta.href}
                  className="rounded-full bg-lilac px-4 py-2 text-caption font-medium text-lilac-ink shadow-2xs hover:bg-lilac-tint transition"
                >
                  For Student Coliving
                </a>
              </div>
            </div>

            {/* Waving character vector graphic matching Flow screenshot */}
            <div className="flex-none">
              <div className="relative flex size-24 items-center justify-center rounded-3xl bg-amber-400 p-2 shadow-md">
                <svg
                  className="size-16 text-stone-900"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="24" cy="22" r="16" className="fill-amber-400" />
                  {/* Waving hand */}
                  <path
                    d="M34 16C37 13 41 12 43 14C45 16 43 20 40 22L36 24"
                    className="stroke-stone-900 fill-amber-300"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Eyes */}
                  <circle cx="19" cy="20" r="2" className="fill-stone-900" />
                  <circle cx="29" cy="20" r="2" className="fill-stone-900" />
                  {/* Big smile */}
                  <path
                    d="M18 28C21 32 27 32 30 28"
                    className="stroke-stone-900"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Cheeks */}
                  <circle cx="15" cy="24" r="2" className="fill-rose-400" />
                  <circle cx="33" cy="24" r="2" className="fill-rose-400" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex rounded-full border border-line bg-surface px-4 py-1 text-caption font-medium text-purple-900">
            Common Inquiries
          </div>
          <h2 className="mt-4 font-display text-h2 text-ink">{title}</h2>
          <p className="mt-2 text-lead text-ink-muted">
            Clear, honest answers about how early access works.
          </p>
        </div>

        {/* FAQ Accordion list */}
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {items.map((item, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-line bg-surface p-5 transition-colors open:bg-canvas-tint"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-[1.25rem] text-ink [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  className="flex size-7 flex-none items-center justify-center rounded-full bg-canvas text-small font-bold text-ink transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  &darr;
                </span>
              </summary>
              <p className="mt-4 text-body leading-relaxed text-ink-muted">
                {item.a}
              </p>
              {"link" in item && item.link ? (
                <div className="mt-4">
                  <a
                    href={item.link.href}
                    className="text-small font-medium text-purple-900 underline hover:text-purple-700"
                  >
                    {item.link.label} &rarr;
                  </a>
                </div>
              ) : null}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
