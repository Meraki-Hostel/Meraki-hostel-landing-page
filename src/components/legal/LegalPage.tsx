import type { ReactNode } from "react";
import { legal, type ReviewStatus } from "@/config/legal";
import { Icon } from "@/components/ui/Icon";

/**
 * Shared shell for /privacy, /terms, and /refund-policy.
 * Each draft page is clearly marked "placeholder — needs legal review before launch."
 */
export function LegalPage({
  title,
  status = "draft",
  children,
}: {
  title: string;
  status?: ReviewStatus;
  children: ReactNode;
}) {
  return (
    <article className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-page max-w-3xl mx-auto">
        {status === "draft" ? (
          <div
            role="note"
            className="mb-8 flex items-center gap-3 rounded-btn border border-amber/40 bg-sand/50 px-4 py-3 text-small text-bark shadow-xs"
          >
            <Icon name="warning" size={18} className="flex-none text-amber" />
            <span className="font-semibold text-espresso uppercase tracking-wider text-caption">
              {legal.draftNotice}
            </span>
          </div>
        ) : null}

        <h1 className="font-heading text-h1 font-medium tracking-tight text-espresso leading-[1.1]">
          {title}
        </h1>

        <div className="mt-8 space-y-8 font-body text-body text-bark leading-relaxed">
          {children}
        </div>
      </div>
    </article>
  );
}
