import type { Metadata } from "next";
import { legal } from "@/config/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Refund and cancellation terms for StayPookie subscription plans. Placeholder — needs legal review before launch.",
};

export default function RefundPolicyPage() {
  const refund = legal.refund;

  return (
    <LegalPage title={refund.title} status={refund.reviewStatus}>
      <p className="font-body text-lead text-bark">{refund.intro}</p>

      {refund.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="font-heading text-h3 font-medium text-espresso">
            {section.heading}
          </h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="text-bark">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </LegalPage>
  );
}

