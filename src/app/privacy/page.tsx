import type { Metadata } from "next";
import { getContact } from "@/config/brand";
import { legal } from "@/config/legal";
import { LegalPage } from "@/components/legal/LegalPage";

const privacy = legal.privacy;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for StayPookie property management software. Placeholder — needs legal review before launch.",
};

export default function PrivacyPage() {
  const { email } = getContact();

  return (
    <LegalPage title={privacy.title} status={privacy.reviewStatus}>
      <p className="font-body text-lead text-bark">{privacy.intro}</p>

      {privacy.sections.map((section) => (
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

      <section className="space-y-3">
        <h2 className="font-heading text-h3 font-medium text-espresso">
          {privacy.contactHeading}
        </h2>
        <p className="text-bark">
          {email ? (
            <>
              {privacy.contactWithEmail}{" "}
              <a
                href={`mailto:${email}`}
                className="font-medium text-clay-600 underline"
              >
                {email}
              </a>
              .
            </>
          ) : (
            privacy.contactMissing
          )}
        </p>
      </section>
    </LegalPage>
  );
}
