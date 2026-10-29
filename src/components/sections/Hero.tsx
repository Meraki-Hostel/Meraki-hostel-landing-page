import { brand } from "@/config/brand";
import { content } from "@/config/site-content";

/**
 * Ref: Clarion hero. Full-bleed photo under a top-to-bottom accent gradient, with the centred
 * headline anchored to the bottom and the marquee beneath it. The illustrative dashboard follows,
 * straddling the band's bottom edge (half on dark, half on canvas).
 */
export function Hero() {
  const { lead, note } = content.hero;
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative bg-canvas pt-[calc(var(--spacing-nav-offset)+2rem)] pb-16 md:pb-24 overflow-hidden"
    >
      {/* Decorative winding dotted thread matching Flow aesthetic */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full stroke-ink/20 [stroke-dasharray:6_6]"
        fill="none"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <path
          d="M-50,80 C150,20 180,240 80,260 C-20,280 20,420 220,400 C450,380 500,490 600,480 C700,470 850,380 980,450 C1100,510 1150,420 1250,490"
          strokeWidth="1.5"
        />
      </svg>

      <div className="container-page relative z-10 flex flex-col items-center text-center">
        {/* Playful pill eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 backdrop-blur-xs">
          <span className="size-2 rounded-full bg-purple-600 animate-pulse" />
          <span className="text-caption font-medium text-ink">
            Simpler Hostel &amp; PG Management
          </span>
        </div>

        {/* Serif headline with italic emphasis */}
        <h1
          id="hero-title"
          className="mx-auto max-w-[16ch] font-display text-[2.75rem] leading-[1.08] tracking-[-0.03em] text-ink sm:text-[3.5rem] md:text-[4.75rem] lg:text-[5.25rem]"
        >
          Run your hostel,{" "}
          <em className="font-serif italic font-normal text-purple-900">
            not your paperwork
          </em>
        </h1>

        <p className="mt-6 max-w-[34rem] text-lead text-ink-muted md:text-[1.25rem] md:leading-relaxed">
          {lead}
        </p>

        {/* CTA Button Group with soft lilac pill */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={brand.primaryCta.href}
            className="btn btn-lilac btn-lg rounded-full px-8 py-3.5 text-body font-medium shadow-sm transition-transform duration-200 hover:scale-[1.02]"
          >
            {brand.primaryCta.label}
          </a>
          <a
            href={brand.secondaryCta.href}
            className="btn btn-ghost-on-light btn-lg rounded-full px-6 py-3.5 text-body"
          >
            {brand.secondaryCta.label}
          </a>
        </div>

        {/* Forest green badge indicator */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-4 py-1.5 text-caption font-medium text-on-dark shadow-xs">
          <span className="size-2 rounded-full bg-emerald-400" />
          <span>{note}</span>
        </div>
      </div>
    </section>
  );
}
