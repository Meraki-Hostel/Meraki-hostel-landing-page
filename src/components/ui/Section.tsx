import type { ReactNode } from "react";

type Tone = "canvas" | "tint" | "dark";

const toneClass: Record<Tone, string> = {
  canvas: "bg-canvas text-ink",
  tint: "bg-canvas-tint text-ink",
  dark: "bg-accent-900 text-on-dark",
};

type SectionProps = {
  id: string;
  labelledBy: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

/** Full-bleed band with the fluid section padding; content goes in a `container-page`. */
export function Section({ id, labelledBy, tone = "canvas", className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-surface={tone === "dark" ? "dark" : undefined}
      className={["py-section", toneClass[tone], className].filter(Boolean).join(" ")}
    >
      {children}
    </section>
  );
}
