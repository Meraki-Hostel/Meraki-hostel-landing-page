import { Icon, type IconName } from "@/components/ui/Icon";

/** 56px gradient disc used in the problem list (specs/05 §3.4, §11). */
export function IconDisc({ name }: { name: IconName }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-14 flex-none items-center justify-center rounded-full bg-linear-to-b from-canvas-tint to-accent-tint text-ink"
    >
      <Icon name={name} size={28} />
    </span>
  );
}

/** White circle clipped by the card's bottom-right corner (why cards, specs/05 §11). */
export function CornerBadge({ name }: { name: IconName }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -right-6 -bottom-6 inline-flex rounded-full bg-surface p-8 text-ink lg:-right-10 lg:-bottom-10 lg:p-10"
    >
      <Icon name={name} size={64} className="size-12 lg:size-16" />
    </span>
  );
}
