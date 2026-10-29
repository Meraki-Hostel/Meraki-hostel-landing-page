import { brand } from "@/config/brand";
import { content } from "@/config/site-content";
import { HeroFlowAnimation } from "@/components/sections/HeroFlowAnimation";

/**
 * Ref: Wispr Flow signature Hero.
 * Displays bold serif headline, pill eyebrow, lilac CTA, and the dual looping animated text ribbons
 * with central flow toasts & waveform animation connecting raw speech to structured records.
 */
export function Hero() {
  const { note } = content.hero;
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative bg-canvas pt-[calc(var(--spacing-nav-offset)+2rem)] pb-8 md:pb-12 overflow-hidden"
    >
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

      {/* Wispr Flow Signature Dual Looping Ribbons & Center Animation Engine */}
      <div className="relative mt-2 md:mt-4">
        <HeroFlowAnimation />
      </div>
    </section>
  );
}
