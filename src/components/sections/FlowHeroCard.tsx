import { brand } from "@/config/brand";
import { sample, PREVIEW_CAPTION } from "@/config/site-content";

export function FlowHeroCard() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        {/* Dark rounded container card matching Flow aesthetic */}
        <div
          data-surface="dark"
          className="relative overflow-hidden rounded-[2.5rem] border border-dark-card-border bg-dark-card p-6 text-on-dark shadow-2xl md:p-12 lg:p-16"
        >
          {/* Subtle ambient glow in background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-purple-900/20 blur-3xl"
          />

          {/* Header block */}
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-caption font-medium text-purple-300 backdrop-blur-xs">
              <span className="size-1.5 rounded-full bg-purple-400" />
              <span>Works everywhere you operate</span>
            </div>

            <h2 className="mt-5 font-display text-h2 text-on-dark tracking-tight">
              Manage every room, bed, and rupee from one clean view
            </h2>

            <p className="mt-4 text-lead text-on-dark-muted">
              Replace scattered registers, lost WhatsApp payment screenshots,
              and confusing spreadsheets with a single live operational ledger.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href={brand.primaryCta.href}
                className="btn btn-lilac rounded-full px-6 py-2.5 text-small font-medium shadow-sm transition-transform hover:scale-[1.02]"
              >
                {brand.primaryCta.label}
              </a>
            </div>
          </div>

          {/* Curved arc of workflow & operational integration icons */}
          <div className="relative z-10 mt-12 mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:mt-16">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-caption font-medium text-white/90 backdrop-blur-md">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                WA
              </span>
              <span>WhatsApp Reminders</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-caption font-medium text-white/90 backdrop-blur-md">
              <span className="flex size-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                UPI
              </span>
              <span>UPI Payment Records</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-caption font-medium text-white/90 backdrop-blur-md">
              <span className="flex size-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                KYC
              </span>
              <span>Aadhaar Tenant Records</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-caption font-medium text-white/90 backdrop-blur-md">
              <span className="flex size-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                T
              </span>
              <span>Tally Export</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-caption font-medium text-white/90 backdrop-blur-md">
              <span className="flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                ₹
              </span>
              <span>Manual Cash Ledger</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-caption font-medium text-white/90 backdrop-blur-md">
              <span className="flex size-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                SMS
              </span>
              <span>Rent Receipts</span>
            </div>
          </div>

          {/* Interactive live mockup window */}
          <div className="relative z-10 mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-2xl backdrop-blur-xl">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80" />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-caption text-white/50">
                  meraki-hostel-dashboard.internal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Floorplan
                </span>
              </div>
            </div>

            {/* Metrics bar */}
            <div className="grid grid-cols-2 gap-2 border-b border-white/10 bg-white/[0.02] p-4 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center sm:text-left">
                <span className="text-[11px] text-white/60">Total Beds</span>
                <p className="font-display text-h3 text-white">48</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center sm:text-left">
                <span className="text-[11px] text-white/60">Occupied</span>
                <p className="font-display text-h3 text-emerald-400">
                  41{" "}
                  <span className="text-xs font-sans text-white/60">(85%)</span>
                </p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center sm:text-left">
                <span className="text-[11px] text-white/60">Vacant Beds</span>
                <p className="font-display text-h3 text-amber-300">7</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center sm:text-left">
                <span className="text-[11px] text-white/60">
                  Dues Outstanding
                </span>
                <p className="font-display text-h3 text-rose-300">₹38,000</p>
              </div>
            </div>

            {/* Room cards grid */}
            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 md:p-6">
              {sample.rooms.slice(0, 4).map((roomItem) => {
                const totalBeds = roomItem.beds.length;
                const occupiedBeds = roomItem.beds.filter(
                  (b) => b === "occupied",
                ).length;
                const vacantBeds = totalBeds - occupiedBeds;

                return (
                  <div
                    key={roomItem.room}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-h3 text-white">
                          Room {roomItem.room}
                        </span>
                        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/70">
                          {totalBeds} Sharing
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          vacantBeds > 0
                            ? "bg-amber-400/20 text-amber-300"
                            : "bg-emerald-400/20 text-emerald-300"
                        }`}
                      >
                        {vacantBeds > 0 ? `${vacantBeds} Vacant` : "Full"}
                      </span>
                    </div>

                    {/* Beds visual dots */}
                    <div className="mt-3 flex gap-2">
                      {roomItem.beds.map((bed, bedIdx) => (
                        <div
                          key={bedIdx}
                          className={`flex-1 rounded-lg py-1.5 text-center text-[11px] font-medium transition-colors ${
                            bed === "occupied"
                              ? "bg-white/10 text-white/80"
                              : "border border-dashed border-amber-400/50 bg-amber-400/10 text-amber-300"
                          }`}
                        >
                          Bed {String.fromCharCode(65 + bedIdx)}:{" "}
                          {bed === "occupied" ? "Occupied" : "Vacant"}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer caption */}
            <div className="border-t border-white/10 bg-black/20 px-4 py-2.5 text-center text-caption text-white/50">
              {PREVIEW_CAPTION}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
