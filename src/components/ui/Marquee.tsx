"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

type MarqueeProps = {
  label: string;
  /** One group of <li> items, rendered on the server; the component loops it. */
  children: ReactNode;
  /** Seconds for one full loop (ref: Clarion 100s hero, 60s / 44s cell rows). */
  duration: number;
  direction?: "rtl" | "ltr";
  onDark?: boolean;
  className?: string;
};

/**
 * CSS-only loop with a visible pause control (WCAG 2.2.2: motion longer than 5s must be
 * pausable; Clarion only pauses on hover). The clone group is hidden from assistive tech.
 */
export function Marquee({ label, children, duration, direction = "rtl", onDark = false, className }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const group = (clone: boolean) => (
    <ul className="flex flex-none" aria-hidden={clone || undefined}>
      {children}
    </ul>
  );

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      <div
        role="region"
        aria-label={label}
        className="marquee"
        data-paused={paused}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="marquee-track" data-direction={direction}>
          {group(false)}
          {group(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={paused ? `Play ${label}` : `Pause ${label}`}
        className={[
          "absolute top-1/2 right-0 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-(--dur-base) ease-out-quart motion-reduce:hidden",
          onDark ? "text-on-dark-muted hover:bg-on-dark/10" : "text-ink-muted hover:bg-line",
        ].join(" ")}
      >
        <Icon name={paused ? "play" : "pause"} size={16} />
      </button>
    </div>
  );
}
