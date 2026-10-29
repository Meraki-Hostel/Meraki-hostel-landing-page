import { brand } from "@/config/brand";
import { content } from "@/config/site-content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CornerBadge } from "@/components/ui/IconBadge";
import { ButtonLink } from "@/components/ui/Button";

/** Four cards with a clipped corner badge, then one centred CTA (ref: Clarion "Why choose"). */
export function WhyMeraki() {
  const { title, lead, cards } = content.why;
  return (
    <Section id="why" labelledBy="why-title" tone="tint">
      <div className="container-page">
        <SectionHeader title={title} titleId="why-title" lead={lead} />
        <ul className="grid gap-gap-md md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <li
              key={card.title}
              className="relative min-h-64 overflow-hidden bg-canvas bg-[radial-gradient(120%_80%_at_0%_100%,color-mix(in_srgb,var(--color-accent-tint)_70%,transparent),transparent_60%)] p-5 md:h-80"
            >
              <h3 className="text-h3">{card.title}</h3>
              <p className="mt-3 max-w-[37ch] text-small text-ink-muted">{card.body}</p>
              <CornerBadge name={card.icon} />
            </li>
          ))}
        </ul>
        <div className="mt-14 flex justify-center">
          <ButtonLink href={brand.primaryCta.href} variant="primary-dark" fullWidthMobile>
            {brand.primaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
