import { content, sample } from "@/config/site-content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PreviewFrame, inr } from "@/components/preview/PreviewFrame";
import { Legend } from "@/components/preview/OccupancyGrid";

function BedsMini() {
  return (
    <div className="p-3">
      <div className="flex flex-wrap gap-1.5">
        {sample.rooms.flatMap((room) => room.beds).slice(0, 18).map((bed, index) => (
          <span key={index} className={["size-7 rounded-[4px]", bed === "occupied" ? "bg-accent-900" : "border border-line-strong bg-surface"].join(" ")} />
        ))}
      </div>
      <Legend />
    </div>
  );
}

function LedgerMini() {
  return (
    <ul className="p-3">
      {sample.rent.slice(0, 3).map((row) => (
        <li key={row.tenant} className="flex items-center justify-between gap-2 border-t border-line py-2 first:border-t-0 first:pt-0">
          <span className="min-w-0 truncate">{row.tenant}</span>
          <span className="flex items-center gap-2 tabular-nums">
            {inr.format(row.amount)}
            <span className={`chip chip-${row.status.toLowerCase()}`}>{row.status}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function RecordMini() {
  const tenant = sample.tenants[0];
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 p-3">
      <dt className="text-ink-muted">Tenant</dt>
      <dd className="truncate font-medium">{tenant.name}</dd>
      <dt className="text-ink-muted">Room</dt>
      <dd>
        {tenant.room} · Bed {tenant.bed}
      </dd>
      <dt className="text-ink-muted">Since</dt>
      <dd>{tenant.since}</dd>
      <dt className="text-ink-muted">Note</dt>
      <dd className="truncate">{sample.ops[0].title}</dd>
    </dl>
  );
}

const illustrations = {
  occupancy: { node: <BedsMini />, summary: "Sample bed grid showing occupied and vacant beds." },
  rent: { node: <LedgerMini />, summary: "Sample list of recorded rent payments with paid and due status." },
  records: { node: <RecordMini />, summary: "Sample tenant record with room, bed and a property note." },
} as const;

/** Three tinted square cards with a mini-UI each (ref: Clarion "Scale your practice"). */
export function Outcomes() {
  const { title, lead, cards } = content.outcomes;
  return (
    <Section id="outcomes" labelledBy="outcomes-title" className="pt-0">
      <div className="container-page">
        <SectionHeader title={title} titleId="outcomes-title" lead={lead} />
        <ul className="grid gap-gap-sm md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const art = illustrations[card.id as keyof typeof illustrations];
            return (
              <li
                key={card.id}
                className={["flex flex-col gap-4 bg-canvas-tint px-card py-8 lg:py-card", index === 2 ? "md:col-span-2 lg:col-span-1" : ""].join(" ")}
              >
                <div className="flex min-h-[200px] items-center md:min-h-[250px]">
                  <PreviewFrame summary={art.summary} className="w-full max-w-sm">
                    {art.node}
                  </PreviewFrame>
                </div>
                <h3 className="text-h3">{card.title}</h3>
                <p className="text-small text-ink-muted">{card.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
