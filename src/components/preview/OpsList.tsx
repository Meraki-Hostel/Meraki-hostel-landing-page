import type { OpsItem } from "@/config/site-content";

export function OpsList({ items }: { items: OpsItem[] }) {
  return (
    <ul className="p-4">
      {items.map((item) => (
        <li key={item.title} className="flex items-start gap-3 border-t border-line py-2.5 first:border-t-0 first:pt-0">
          <span className="mt-1.5 size-2 flex-none rounded-full bg-line-strong" />
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium">{item.title}</span>
            <span className="block truncate text-ink-muted">{item.detail}</span>
          </span>
          <span className="chip chip-neutral">{item.tag}</span>
        </li>
      ))}
    </ul>
  );
}
