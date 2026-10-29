import { content } from "@/config/site-content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DashboardPreview } from "@/components/preview/DashboardPreview";

/** Asymmetric 4/7 split: labels (no numbers) beside the illustrative dashboard. */
export function Attention() {
  const { title, lead, items } = content.attention;
  return (
    <Section id="attention" labelledBy="attention-title" tone="tint">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-gap-main">
        <div className="lg:col-span-4">
          <SectionHeader title={title} titleId="attention-title" lead={lead} align="start" className="mb-10" />
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.label} className="border-l-2 border-rule pl-4">
                <p className="font-medium">{item.label}</p>
                <p className="text-small text-ink-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 lg:col-span-7 lg:col-start-6">
          <DashboardPreview />
        </div>
      </div>
    </Section>
  );
}
