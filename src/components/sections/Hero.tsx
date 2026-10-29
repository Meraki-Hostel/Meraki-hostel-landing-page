import { brand } from "@/config/brand";
import { content } from "@/config/site-content";

/**
 * Ref: Clarion hero. Full-bleed photo under a top-to-bottom accent gradient, with the centred
 * headline anchored to the bottom and the marquee beneath it. The illustrative dashboard follows,
 * straddling the band's bottom edge (half on dark, half on canvas).
 */
export function Hero() {
  const { note } = content.hero;
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative bg-canvas pt-[calc(var(--spacing-nav-offset)+2rem)] pb-16 md:pb-24 overflow-hidden"
    >
      {/* Wispr Flow signature animated text ribbon */}
      <div className="pointer-events-none absolute inset-x-0 top-16 h-72 w-full overflow-hidden opacity-60">
        <svg
          id="hero-ribbon-svg"
          width="100%"
          height="100%"
          viewBox="0 0 1200 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            id="curve-ribbon"
            d="M-100,160 C150,60 300,220 550,140 C800,60 950,210 1300,120"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="text-ink/20"
          />
          <text className="font-mono text-[11px] font-semibold tracking-wider">
            <textPath href="#curve-ribbon" className="fill-ink/35">
              Room 101 occupied &middot; Aarav Sharma paid November rent ₹8,500 via UPI &middot; Bed 103-B vacant ₹7,500/mo &middot; Move-out scheduled for 15 Nov &middot; Meter reading recorded &middot; Priya Nair verified KYC &middot; Room 201-C overdue follow-up &middot;
              <animate attributeName="startOffset" from="0%" to="-50%" dur="30s" repeatCount="indefinite" />
            </textPath>
          </text>
        </svg>
      </div>

      <div className="container-page relative z-10 flex flex-col items-center text-center">
        {/* Playful pill eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-1.5 backdrop-blur-xs">
          <span className="size-2 rounded-full bg-purple-600 animate-pulse" />
          <span className="text-caption font-medium text-ink uppercase tracking-wider">
            {brand.name} Hostel Management
          </span>
        </div>

        {/* Serif headline with italic emphasis */}
        <h1
          id="hero-title"
          className="mx-auto max-w-[16ch] font-display text-[2.75rem] leading-[1.08] tracking-[-0.03em] text-ink sm:text-[3.5rem] md:text-[4.75rem] lg:text-[5.5rem]"
        >
          Don&apos;t chase rent,
          <br />
          <em className="font-serif italic font-normal text-purple-900">
            just manage.
          </em>
        </h1>

        <p className="mt-6 max-w-[34rem] text-lead text-ink-muted md:text-[1.25rem] md:leading-relaxed">
          The hostel &amp; PG management platform that turns daily operational chaos into clear, effortless control.
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
