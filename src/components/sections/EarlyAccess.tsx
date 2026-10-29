import { brand, getContact } from "@/config/brand";
import { content } from "@/config/site-content";
import { isLeadCaptureEnabled } from "@/lib/lead-config";
import { EarlyAccessForm } from "@/components/sections/EarlyAccessForm";

export function EarlyAccess() {
  const copy = content.earlyAccess;
  const contact = getContact();
  return (
    <section
      id="early-access"
      aria-labelledby="early-access-title"
      className="bg-canvas pb-16 md:pb-24"
    >
      <div className="container-page">
        <div className="rounded-[2.5rem] border border-line bg-canvas-tint p-8 sm:p-12 lg:p-16 shadow-sm">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex rounded-full border border-line bg-surface px-4 py-1 text-caption font-medium text-purple-900 mb-4">
                Early Access Program
              </div>
              <h2
                id="early-access-title"
                className="font-display text-h2 text-ink"
              >
                {copy.title}
              </h2>
              <p className="mt-4 text-lead text-ink-muted leading-relaxed">
                {copy.lead}
              </p>
              <div className="mt-6 rounded-2xl border border-line bg-surface/80 p-5 text-small text-ink-muted shadow-2xs">
                <p className="font-medium text-ink mb-1">Personal Follow-Up</p>
                <p>{copy.afterSubmit}</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mx-auto rounded-3xl border border-line bg-surface p-6 sm:p-10 shadow-sm">
                <EarlyAccessForm
                  copy={copy}
                  submitLabel={brand.submitLabel}
                  enabled={isLeadCaptureEnabled()}
                  contact={{ email: contact.email, phone: contact.phone }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
