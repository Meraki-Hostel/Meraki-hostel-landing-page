import type { PaymentStatus, RentRow } from "@/config/site-content";
import { inr } from "@/components/preview/PreviewFrame";

const chipClass: Record<PaymentStatus, string> = {
  Paid: "chip chip-paid",
  Due: "chip chip-due",
  Overdue: "chip chip-overdue",
};

/** Recorded rent, never "collected": payments are recorded by the operator (specs/06). */
export function RentLedger({ rows, limit }: { rows: RentRow[]; limit?: number }) {
  const shown = limit ? rows.slice(0, limit) : rows;
  return (
    <div className="@container px-4 pt-2 pb-3">
      {/* Table layout from 28rem; stacked rows below. */}
      <table className="hidden w-full border-collapse @md:table">
        <thead>
          <tr className="text-left text-caption tracking-[0.04em] text-ink-muted uppercase">
            <th className="py-2 font-medium">Tenant</th>
            <th className="hidden py-2 font-medium @xl:table-cell">Room</th>
            <th className="py-2 text-right font-medium">Recorded</th>
            <th className="py-2 pl-3 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((row) => (
            <tr key={row.tenant} className="h-10 border-t border-line">
              <td className="max-w-0 truncate pr-2">{row.tenant}</td>
              <td className="hidden text-ink-muted @xl:table-cell">{row.room}</td>
              <td className="text-right tabular-nums">{inr.format(row.amount)}</td>
              <td className="pl-3 text-right">
                <span className={chipClass[row.status]}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="@md:hidden">
        {shown.map((row) => (
          <li key={row.tenant} className="border-t border-line py-2 first:border-t-0">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate">{row.tenant}</span>
              <span className={chipClass[row.status]}>{row.status}</span>
            </div>
            <div className="text-ink-muted tabular-nums">{inr.format(row.amount)} · {row.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
