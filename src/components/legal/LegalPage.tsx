import type { ReactNode } from "react";
import { legal, type ReviewStatus } from "@/config/legal";
import { Icon } from "@/components/ui/Icon";

/** Shared shell for /privacy and /terms. Drafts always say so (owner decision D-6). */
export function LegalPage({ title, status, children }: { title: string; status: ReviewStatus; children: ReactNode }) {
  return (
    <article className="mx-auto w-[min(100%-2*var(--spacing-gutter),var(--container-narrow))] pt-[calc(var(--spacing-nav-offset)+3rem)] pb-section">
      {status === "draft" ? (
        <p role="note" className="mb-8 flex gap-3 rounded-input bg-warning-tint p-4 text-small">
          <Icon name="warning" size={20} className="flex-none text-warning" />
          <span>
            <strong className="font-medium">{legal.draftNotice}</strong>
          </span>
        </p>
      ) : null}
      <h1 className="text-h2">{title}</h1>
      <div className="mt-8 max-w-[65ch] space-y-8">{children}</div>
    </article>
  );
}
