import type { Metadata } from "next";
import { legal } from "@/config/legal";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms will be published before the product is available. Draft pending review.",
};

export default function TermsPage() {
  return (
    <LegalPage title={legal.terms.title} status={legal.terms.reviewStatus}>
      {legal.terms.body.map((paragraph) => (
        <p key={paragraph} className="text-ink-muted">
          {paragraph}
        </p>
      ))}
    </LegalPage>
  );
}
