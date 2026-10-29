import { content } from "@/config/site-content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconDisc } from "@/components/ui/IconBadge";

/** Text-led: where information lives today, each with a 2px left rule (no stats). */
export function Problem() {
  const { title, lead, items } = content.problem;
  return (
    <Section id="problem" labelledBy="problem-title">
      <div className="container-page">
        <SectionHeader title={title} titleId="problem-title" lead={lead} />
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-gap-main">
          {items.map((item) => (
            <li key={item.label} className="border-l-2 border-rule pl-4">
              <IconDisc name={item.icon} />
              <p className="mt-4 font-medium">{item.label}</p>
              <p className="mt-1 text-small text-ink-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
