import { sample, PREVIEW_CAPTION } from "@/config/site-content";

export function FlowBentoGrid() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        {/* Section title */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex rounded-full border border-line bg-surface px-4 py-1 text-caption font-medium text-purple-900">
            Property Essentials
          </div>
          <h2 className="mt-4 font-display text-h2 text-ink">
            The operational details you look up every day
          </h2>
          <p className="mt-3 text-lead text-ink-muted">
            Designed around the everyday questions hostel managers answer for
            staff, tenants, and parents.
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Bento Card 1: Bed Matrix */}
          <div
            data-surface="dark"
            className="flex flex-col justify-between rounded-[2rem] border border-dark-card-border bg-dark-card p-6 text-on-dark shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-caption font-medium text-purple-300">
                  Floor 1 &middot; Corridors
                </span>
                <span className="text-caption text-white/50">
                  {PREVIEW_CAPTION}
                </span>
              </div>
              <h3 className="mt-5 font-display text-h3 text-white">
                Bed-Level Occupancy Matrix
              </h3>
              <p className="mt-2 text-small text-on-dark-muted">
                See exactly which bed in which room is free to fill right now.
              </p>

              {/* Bed chips display */}
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex justify-between text-caption font-medium text-white mb-2">
                    <span>Room 101 (Triple AC)</span>
                    <span className="text-amber-400">1 Vacant</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="flex-1 rounded-md bg-emerald-500/20 py-1 text-center text-[10px] text-emerald-300">
                      Bed A
                    </span>
                    <span className="flex-1 rounded-md bg-emerald-500/20 py-1 text-center text-[10px] text-emerald-300">
                      Bed B
                    </span>
                    <span className="flex-1 rounded-md border border-dashed border-amber-400/50 bg-amber-400/10 py-1 text-center text-[10px] text-amber-300">
                      Bed C
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex justify-between text-caption font-medium text-white mb-2">
                    <span>Room 102 (Double Sharing)</span>
                    <span className="text-emerald-400">Full</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="flex-1 rounded-md bg-emerald-500/20 py-1 text-center text-[10px] text-emerald-300">
                      Bed A
                    </span>
                    <span className="flex-1 rounded-md bg-emerald-500/20 py-1 text-center text-[10px] text-emerald-300">
                      Bed B
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 text-caption text-white/60">
              Updates in real-time as allocations change
            </div>
          </div>

          {/* Bento Card 2: Tenant Records & KYC */}
          <div
            data-surface="dark"
            className="flex flex-col justify-between rounded-[2rem] border border-dark-card-border bg-dark-card p-6 text-on-dark shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-caption font-medium text-emerald-300">
                  Tenant Directory
                </span>
                <span className="text-caption text-white/50">
                  {PREVIEW_CAPTION}
                </span>
              </div>
              <h3 className="mt-5 font-display text-h3 text-white">
                Tenant Records &amp; Allocations
              </h3>
              <p className="mt-2 text-small text-on-dark-muted">
                Each tenant&apos;s details stay pinned to their allocated room
                and bed.
              </p>

              {/* Sample tenant cards */}
              <div className="mt-6 space-y-3">
                {sample.tenants.slice(0, 2).map((tenant) => (
                  <div
                    key={tenant.name}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">
                        {tenant.name[0]}
                      </div>
                      <div>
                        <p className="text-small font-medium text-white">
                          {tenant.name}
                        </p>
                        <p className="text-[11px] text-white/60">
                          Since {tenant.since}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-md bg-white/10 px-2 py-1 text-[11px] text-white/80">
                      Rm {tenant.room}-{tenant.bed}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 text-caption text-white/60">
              Clear records without rummaging through old chats
            </div>
          </div>

          {/* Bento Card 3: Operational Notes & Chores */}
          <div
            data-surface="dark"
            className="flex flex-col justify-between rounded-[2rem] border border-dark-card-border bg-dark-card p-6 text-on-dark shadow-xl md:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-caption font-medium text-amber-300">
                  Daily Follow-ups
                </span>
                <span className="text-caption text-white/50">
                  {PREVIEW_CAPTION}
                </span>
              </div>
              <h3 className="mt-5 font-display text-h3 text-white">
                Property Notes &amp; Follow-ups
              </h3>
              <p className="mt-2 text-small text-on-dark-muted">
                Keep maintenance notes and chores visible so nothing slips
                through.
              </p>

              {/* Ops items checklist */}
              <div className="mt-6 space-y-2.5">
                {sample.ops.slice(0, 3).map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-small font-medium text-white">
                        {item.title}
                      </p>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-white/60">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 text-caption text-white/60">
              Never rely on memory or lost sticky notes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
