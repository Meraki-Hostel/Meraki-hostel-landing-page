type SectionHeaderProps = {
  title: string;
  titleId: string;
  lead?: string;
  align?: "center" | "start";
  onDark?: boolean;
  className?: string;
};

/** Centred (default) or left-aligned H2 + one supporting sentence (specs/05 §14). */
export function SectionHeader({ title, titleId, lead, align = "center", onDark = false, className }: SectionHeaderProps) {
  const centred = align === "center";
  return (
    <div className={[centred ? "mx-auto text-center" : "", "mb-(--spacing-header)", className].filter(Boolean).join(" ")}>
      <h2 id={titleId} tabIndex={-1} className={["text-h2 focus:outline-none", centred ? "mx-auto max-w-[16em]" : ""].join(" ")}>
        {title}
      </h2>
      {lead ? (
        <p className={["mt-4 max-w-[36rem]", centred ? "mx-auto" : "", onDark ? "text-on-dark-muted" : "text-ink-muted"].join(" ")}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
