import { brand } from "@/config/brand";

export function FlowSpeedShowcase() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        {/* Deep forest green container card matching wisprflow.ai */}
        <div
          data-surface="dark"
          className="relative overflow-hidden rounded-[2.5rem] bg-forest p-8 text-on-dark shadow-2xl md:p-14"
        >
          {/* Section title block */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[2.5rem] leading-[1.1] text-white sm:text-[3.5rem] md:text-[4rem]">
              4x faster{" "}
              <em className="font-serif italic font-normal text-emerald-300">
                than paper registers
              </em>
            </h2>
            <p className="mt-4 text-lead text-white/80">
              Hostel management that finally works is here. The platform lets you allocate rooms, record rent, and check vacancies at the speed of thought, 4x faster than paper registers.
            </p>
          </div>

          {/* Wispr Flow Speed Comparison Stage (Keyboard 45wpm vs Flow 220wpm -> Notebook vs Platform) */}
          <div className="mt-12 space-y-4">
            {/* Box 1: Paper Register (Slow) */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="font-display text-h3 text-white/70">
                  Paper Registers &amp; Notebooks
                </span>
                <span className="font-mono text-small font-medium text-amber-300">
                  ~15 mins per tenant record
                </span>
              </div>

              {/* Scrolling text tape showing slow manual chaos */}
              <div className="mt-3 overflow-hidden py-1">
                <p className="font-mono text-small text-white/40 whitespace-nowrap animate-pulse">
                  Flipping through 2025 register &rarr; finding Room 204 page &rarr; checking WhatsApp screenshot for UTR &rarr; manual calculation of balance &rarr; tearing paper receipt...
                </p>
              </div>
            </div>

            {/* Box 2: Fast One-Tap Workflow */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald-400/40 bg-black/50 p-6 shadow-xl backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/15 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-display text-[1.5rem] font-medium text-white">
                    {brand.name} One-Tap Workflow
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-3.5 py-1 font-mono text-small font-bold text-emerald-300 border border-emerald-400/30">
                  15 seconds &middot; 4x Faster
                </span>
              </div>

              {/* Live instant stream */}
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="text-[11px] text-white/60">Tap 1</span>
                  <p className="text-small font-medium text-white">Tap Room 103 Bed B</p>
                  <span className="text-[10px] text-emerald-300">Instant Vacancy Check</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="text-[11px] text-white/60">Tap 2</span>
                  <p className="text-small font-medium text-white">Record ₹8,500 via UPI</p>
                  <span className="text-[10px] text-emerald-300">Balance Auto-Calculated</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <span className="text-[11px] text-white/60">Tap 3</span>
                  <p className="text-small font-medium text-white">Send WhatsApp Receipt</p>
                  <span className="text-[10px] text-emerald-300">Zero Disputes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA within card */}
          <div className="mt-10 flex justify-center">
            <a
              href={brand.primaryCta.href}
              className="btn btn-lilac rounded-full px-8 py-3 text-body font-medium shadow-sm transition-transform hover:scale-[1.02]"
            >
              {brand.primaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
