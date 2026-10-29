import { brand, getContact } from "@/config/brand";
import { content } from "@/config/site-content";
import { isLeadCaptureEnabled } from "@/lib/lead-config";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EarlyAccessForm } from "@/components/sections/EarlyAccessForm";

/** Intro beside the form card (Clarion modal card styling, placed inline). */
export function EarlyAccess() {
  const copy = content.earlyAccess;
  const contact = getContact();
  return (
    <Section id="early-access" labelledBy="early-access-title">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-gap-main">
        <div className="lg:col-span-5">
          <SectionHeader title={copy.title} titleId="early-access-title" lead={copy.lead} align="start" className="mb-6" />
          <p className="max-w-[36rem] text-ink-muted">{copy.afterSubmit}</p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="mx-auto max-w-form rounded-form border border-line bg-surface p-6 sm:p-10">
            <EarlyAccessForm
              copy={copy}
              submitLabel={brand.submitLabel}
              enabled={isLeadCaptureEnabled()}
              contact={{ email: contact.email, phone: contact.phone }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
