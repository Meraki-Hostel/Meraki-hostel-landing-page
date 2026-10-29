import type { ReactNode } from "react";
import { brand } from "@/config/brand";
import { PREVIEW_CAPTION, SAMPLE_PROPERTY } from "@/config/site-content";

type PreviewFrameProps = {
  /** One-sentence description read by assistive technology instead of the sample values. */
  summary: string;
  /** Screen title shown in the mock chrome bar, e.g. "Rooms". */
  screen?: string;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Every product mock-up renders through this frame: it is illustrative, uses sample data,
 * and always shows the caption below the frame (specs/05 §13, specs/01 FR-60–FR-62).
 */
export function PreviewFrame({ summary, screen, onDark = false, className, children }: PreviewFrameProps) {
  return (
    <figure data-preview className={["@container min-w-0", className].filter(Boolean).join(" ")}>
      <div aria-hidden="true" inert className="overflow-clip rounded-preview border border-line bg-surface text-preview text-ink">
        <div className="flex h-10 items-center gap-3 border-b border-line bg-canvas px-4">
          <span className="font-display text-[0.9375rem] leading-none">{brand.name}</span>
          <span className="truncate text-ink-muted">{SAMPLE_PROPERTY}</span>
          {screen ? <span className="ml-auto hidden font-medium text-ink-muted @md:inline">{screen}</span> : null}
        </div>
        {children}
      </div>
      <figcaption className={["mt-3 text-caption", onDark ? "text-on-dark-muted" : "text-ink-muted"].join(" ")}>
        {PREVIEW_CAPTION}
        <span className="sr-only">. {summary}</span>
      </figcaption>
    </figure>
  );
}

export const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
