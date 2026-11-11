import { pageMetadata } from "@/lib/metadata";
import { legal } from "@/config/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern purchasing, subscribing to and using StayPookie hostel and PG management software.",
  path: "/terms",
});

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
