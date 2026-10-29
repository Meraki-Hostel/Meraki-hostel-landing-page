import { content } from "@/config/site-content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";
import { Marquee } from "@/components/ui/Marquee";

/** The owner's month as a bordered cell flow (replaces Clarion's integration logos). */
export function HowItWorks() {
  const { title, lead, steps, rows, rowsLead } = content.howItWorks;
  return (
    <Section
      id="how-it-works"
      labelledBy="how-it-works-title"
      className="bg-[radial-gradient(60%_50%_at_100%_100%,color-mix(in_srgb,var(--color-accent-tint)_60%,transparent),transparent_70%)]"
    >
      <div className="container-page">
        <SectionHeader title={title} titleId="how-it-works-title" lead={lead} />
        <ol className="mx-auto flex max-w-[62rem] flex-col md:flex-row">
          {steps.map((step, index) => (
            <li
              key={step}
              className="relative -mt-px flex min-h-20 flex-1 flex-col items-center justify-center border border-line bg-canvas p-4 text-center first:mt-0 md:mt-0 md:-ml-px md:first:ml-0"
            >
              <span className="text-caption text-ink-muted">Step {index + 1}</span>
              <span className="mt-1 font-medium">{step}</span>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[9px] left-1/2 z-10 -translate-x-1/2 bg-canvas text-ink-muted md:top-1/2 md:-right-[9px] md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2"
                >
                  <Icon name="arrowRight" size={16} className="rotate-90 md:rotate-0" />
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        {/* Clarion's integration marquees: bordered cells, opposite directions (60s / 44s). */}
        <p className="mt-20 text-center text-small text-ink-muted">{rowsLead}</p>
        <div className="mt-8 space-y-10">
          {rows.map((row) => (
            <div key={row.label}>
              <h3 className="text-center text-h3">{row.label}</h3>
              <Marquee
                label={row.label}
                duration={row.duration}
                direction={row.direction}
                className="mt-5 pr-12"
              >
                {row.items.map((item) => (
                  <li
                    key={item}
                    className="-mr-px flex h-20 w-[11.4286rem] flex-none items-center justify-center border border-line bg-canvas px-3 text-center text-small font-medium"
                  >
                    {item}
                  </li>
                ))}
              </Marquee>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
