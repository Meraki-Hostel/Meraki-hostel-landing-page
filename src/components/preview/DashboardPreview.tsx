import { sample } from "@/config/site-content";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { RentLedger } from "@/components/preview/RentLedger";
import { OccupancyGrid } from "@/components/preview/OccupancyGrid";

const sidebar = ["Overview", "Rooms", "Tenants", "Rent", "Records"];

/** Summary tiles + occupancy + recorded payments. Sidebar only when the frame is ≥48rem. */
export function DashboardPreview({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  return (
    <PreviewFrame summary={sample.dashboard.summary} screen="Overview" onDark={onDark} className={className}>
      <div className="flex">
        <nav className="hidden w-[180px] flex-none border-r border-line bg-canvas p-3 @3xl:block">
          <ul className="space-y-1">
            {sidebar.map((item, index) => (
              <li key={item} className={["rounded-md px-3 py-2", index === 0 ? "bg-canvas-tint font-medium" : "text-ink-muted"].join(" ")}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-2 gap-2 p-4 pb-0 @2xl:grid-cols-4">
            {sample.dashboard.tiles.map((tile) => (
              <div key={tile.label} className="rounded-lg border border-line bg-canvas px-4 py-3">
                <div className="text-ink-muted">{tile.label}</div>
                <div className="mt-1 font-display text-preview-num tabular-nums">{tile.value}</div>
              </div>
            ))}
          </div>
          <div className="grid @3xl:grid-cols-[1fr_1.3fr]">
            <div className="hidden @3xl:block">
              <h4 className="px-4 pt-4 font-medium">Beds</h4>
              <OccupancyGrid rooms={sample.rooms} compact />
            </div>
            <div className="min-w-0">
              <h4 className="px-4 pt-4 font-medium">Recently recorded payments</h4>
              <RentLedger rows={sample.rent} limit={4} />
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
