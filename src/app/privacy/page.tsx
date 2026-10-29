import type { Metadata } from "next";
import { getContact } from "@/config/brand";
import { legal } from "@/config/legal";
import { LegalPage } from "@/components/legal/LegalPage";

const privacy = legal.privacy;

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How early-access requests are handled. Draft pending review.",
};

export default function PrivacyPage() {
  const { email } = getContact();
  return (
    <LegalPage title={privacy.title} status={privacy.reviewStatus}>
      <p className="text-lead">{privacy.intro}</p>
      {privacy.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-h3">{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-ink-muted">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <section>
        <h2 className="text-h3">{privacy.contactHeading}</h2>
        <p className="mt-3 text-ink-muted">
          {email ? (
            <>
              {privacy.contactWithEmail}{" "}
              <a href={`mailto:${email}`} className="font-medium text-accent-900 underline">
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
