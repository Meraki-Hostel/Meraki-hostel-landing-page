import { brand } from "@/config/brand";
import { content } from "@/config/site-content";
import { ButtonLink } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/preview/DashboardPreview";
import { Marquee } from "@/components/ui/Marquee";
import Image from "next/image";
import { photos } from "@/config/images";

/**
 * Ref: Clarion hero. Full-bleed photo under a top-to-bottom accent gradient, with the centred
 * headline anchored to the bottom and the marquee beneath it. The illustrative dashboard follows,
 * straddling the band's bottom edge (half on dark, half on canvas).
 */
export function Hero() {
  const { title, lead, note, ticker, tickerLabel } = content.hero;
  return (
    <section id="hero" aria-labelledby="hero-title" className="bg-canvas">
      <div
        data-surface="dark"
        className="relative isolate flex min-h-[min(95svh,58rem)] flex-col justify-end overflow-hidden bg-accent-900 pt-[calc(var(--spacing-nav-offset)+3rem)] pb-14 md:pb-16"
      >
        <Image
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="-z-20 object-cover object-[50%_35%]"
        />
        {/* Clarion overlay: transparent 18% → solid 92%. Kept denser at the top so text stays ≥4.5:1. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-accent-900)_45%,transparent)_0%,color-mix(in_srgb,var(--color-accent-900)_70%,transparent)_35%,var(--color-accent-900)_88%)]"
        />
        <div className="container-page flex flex-col items-center text-center">
          <h1 id="hero-title" className="max-w-[12em] text-h1">
            {title.split(/(?<=\.)\s+/).map((sentence) => (
              <span key={sentence} className="block">
                {sentence}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[36rem] text-lead text-on-dark-muted">{lead}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-btn-group">
            <ButtonLink href={brand.primaryCta.href} variant="primary-light" fullWidthMobile>
              {brand.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={brand.secondaryCta.href} variant="ghost-on-dark" fullWidthMobile>
              {brand.secondaryCta.label}
            </ButtonLink>
          </div>
          <p className="mt-6 text-small text-on-dark-muted">{note}</p>
        </div>
        {/* Clarion's hero logo marquee (100s linear, 60% opacity); here it shows planned capabilities, not logos. */}
        <Marquee
          label={tickerLabel}
          duration={100}
          onDark
          className="mt-12 pr-12 opacity-60 md:mt-14"
        >
          {ticker.map((item) => (
            <li key={item} className="flex flex-none items-center gap-16 pr-16 font-display text-[1.5rem] leading-none whitespace-nowrap">
              {item}
              <span aria-hidden="true" className="size-1.5 rounded-full bg-on-dark" />
            </li>
          ))}
        </Marquee>
      </div>
      <div className="bg-[linear-gradient(180deg,var(--color-accent-900)_50%,var(--color-canvas)_50%)]">
        <div className="container-page">
          <DashboardPreview className="mx-auto max-w-[70rem] [&>figcaption]:text-ink-muted" />
        </div>
      </div>
    </section>
  );
}
