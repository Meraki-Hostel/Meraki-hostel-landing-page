import type { RoomSample } from "@/config/site-content";

/** Bed grid with two states only: occupied and vacant (specs/05 §13). */
export function OccupancyGrid({ rooms, compact = false }: { rooms: RoomSample[]; compact?: boolean }) {
  const shown = compact ? rooms.slice(0, 4) : rooms;
  return (
    <div className="@container p-4">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-2">
        {shown.map((room) => (
          <li key={room.room} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-canvas px-3 py-2">
            <span className="font-medium whitespace-nowrap">Room {room.room}</span>
            <span className="flex flex-wrap justify-end gap-1.5">
              {room.beds.map((bed, index) => (
                <span
                  key={index}
                  className={[
                    "size-6 rounded-[4px]",
                    bed === "occupied" ? "bg-accent-900" : "border border-line-strong bg-surface",
                  ].join(" ")}
                />
              ))}
            </span>
          </li>
        ))}
      </ul>
      <Legend />
    </div>
  );
}

export function Legend() {
  return (
    <div className="mt-3 flex gap-4 text-ink-muted">
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded-[3px] bg-accent-900" /> Occupied
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-3 rounded-[3px] border border-line-strong bg-surface" /> Vacant
      </span>
    </div>
  );
}
