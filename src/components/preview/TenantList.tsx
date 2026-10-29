import type { TenantSample } from "@/config/site-content";

export function TenantList({ tenants }: { tenants: TenantSample[] }) {
  return (
    <ul className="p-4">
      {tenants.map((tenant) => (
        <li key={tenant.name} className="flex items-center gap-3 border-t border-line py-2.5 first:border-t-0 first:pt-0">
          <span className="inline-flex size-8 flex-none items-center justify-center rounded-full bg-accent-tint font-medium text-accent-900">
            {tenant.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium">{tenant.name}</span>
            <span className="block text-ink-muted">
              Room {tenant.room} · Bed {tenant.bed}
            </span>
          </span>
          <span className="hidden text-ink-muted @sm:inline">Since {tenant.since}</span>
        </li>
      ))}
    </ul>
  );
}
