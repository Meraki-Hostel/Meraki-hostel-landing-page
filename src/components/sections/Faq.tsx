import { content } from "@/config/site-content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/ui/Icon";

/** Native <details>/<summary>: accessible, keyboard-operable, zero JS (specs/01 FR-51). */
export function Faq() {
  const { title, items } = content.faq;
  return (
    <Section id="faq" labelledBy="faq-title" tone="tint">
      <div className="mx-auto w-[min(100%-2*var(--spacing-gutter),var(--container-narrow))]">
        <SectionHeader title={title} titleId="faq-title" />
        <div className="border-b border-line">
          {items.map((item) => (
            <details key={item.q} className="group border-t border-line">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lead font-medium [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-lead font-medium">{item.q}</h3>
                <Icon name="chevronDown" size={20} className="flex-none transition-transform duration-(--dur-fast) group-open:rotate-180" />
              </summary>
              <div className="max-w-[65ch] pb-5 text-ink-muted">
                <p>{item.a}</p>
                {"link" in item && item.link ? (
                  <p className="mt-3">
                    <a href={item.link.href} className="font-medium text-accent-900 underline">
                      {item.link.label}
                    </a>
                  </p>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
