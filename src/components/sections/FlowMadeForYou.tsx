import { brand } from "@/config/brand";

export function FlowMadeForYou() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        <div
          data-surface="dark"
          className="relative overflow-hidden rounded-[2.5rem] border border-dark-card-border bg-dark-card p-8 text-on-dark shadow-2xl md:p-14"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Copy & Checklist */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-h2 text-white">
                Made for the way{" "}
                <em className="font-serif italic font-normal text-purple-300">
                  you work
                </em>
              </h2>

              <p className="mt-4 max-w-xl text-lead text-on-dark-muted">
                Every property has its own rules: shared rooms, single
                occupancy, food inclusions, and custom billing dates. The system
                fits your property, not the other way around.
              </p>

              {/* Feature pills grid */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  "Room & Bed Allocation",
                  "Offline-ready records",
                  "WhatsApp-friendly receipts",
                  "Monthly dues ledger",
                  "Advance deposit tracker",
                  "Notice period alerts",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-caption font-medium text-white/90 backdrop-blur-xs"
                  >
                    <span className="text-emerald-400">✓</span>
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-small font-medium text-white/70">
                  Simplify your daily management
                </p>
                <div className="mt-3">
                  <a
                    href={brand.primaryCta.href}
                    className="btn btn-lilac rounded-full px-6 py-2.5 text-small font-medium shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    {brand.primaryCta.label}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Whimsical Retro Keyboard & Action Bubbles graphic matching Flow screenshot */}
            <div className="relative flex items-center justify-center lg:col-span-5">
              <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-inner backdrop-blur-md">
                {/* Floating playful action pills */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 self-start rounded-xl border border-purple-400/30 bg-purple-500/20 px-3.5 py-2 text-small font-medium text-purple-200 shadow-sm animate-pulse">
                    <span className="size-2 rounded-full bg-purple-400" />
                    <span>Rent received: ₹9,000 (Room 102-B)</span>
                  </div>

                  <div className="flex items-center gap-2 self-end rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-2 text-small font-medium text-emerald-200 shadow-sm">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    <span>Bed 201-A Assigned &middot; KYC verified</span>
                  </div>

                  <div className="flex items-center gap-2 self-start rounded-xl border border-amber-400/30 bg-amber-500/20 px-3.5 py-2 text-small font-medium text-amber-200 shadow-sm">
                    <span className="size-2 rounded-full bg-amber-400" />
                    <span>Notice period logged: Move-out on 15 Nov</span>
                  </div>
                </div>

                {/* Stylized keyboard graphic */}
                <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-4 shadow-lg">
                  <div className="flex justify-between text-[11px] text-white/40 mb-3">
                    <span>OPERATOR CONSOLE</span>
                    <span className="text-emerald-400">READY</span>
                  </div>

                  {/* Keyboard key grid */}
                  <div className="grid grid-cols-6 gap-1.5">
                    {["ESC", "101", "102", "103", "201", "DEL"].map((k) => (
                      <div
                        key={k}
                        className="rounded-md border border-white/15 bg-white/10 py-2 text-center font-mono text-[11px] font-semibold text-white/80 shadow-xs"
                      >
                        {k}
                      </div>
                    ))}
                    {["TAB", "BED A", "BED B", "BED C", "DUE", "ENTER"].map(
                      (k) => (
                        <div
                          key={k}
                          className={`rounded-md border border-white/15 py-2 text-center font-mono text-[11px] font-semibold shadow-xs ${
                            k === "ENTER"
                              ? "bg-purple-600 text-white border-purple-500"
                              : "bg-white/10 text-white/80"
                          }`}
                        >
                          {k}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
