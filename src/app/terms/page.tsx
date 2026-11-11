import type { Metadata } from "next";
import { legal } from "@/config/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for StayPookie property management software. Placeholder — needs legal review before launch.",
};

export default function TermsPage() {
  return (
    <LegalPage title={legal.terms.title} status={legal.terms.reviewStatus}>
      <p className="font-body text-lead text-bark">{legal.terms.intro}</p>

      {legal.terms.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="font-heading text-h3 font-medium text-espresso">
            {section.heading}
          </h2>
          {section.body.map((para) => (
            <p key={para} className="text-bark">
              {para}
            </p>
          ))}
        </section>
      ))}
    </LegalPage>
  );
}
