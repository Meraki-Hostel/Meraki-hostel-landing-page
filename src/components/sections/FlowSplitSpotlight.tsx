import Image from "next/image";
import { photos } from "@/config/images";
import { brand } from "@/config/brand";

export function FlowSplitSpotlight() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Portrait photo with floating dark action bar */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-line bg-dark-card shadow-2xl">
              <Image
                src={photos.steps[0].src}
                alt={photos.steps[0].alt}
                fill
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />

              {/* Floating sleek action bar at the bottom */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/75 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="size-2.5 rounded-full bg-amber-400 animate-ping" />
                    <div>
                      <p className="text-small font-medium text-white">
                        Recording cash rent: ₹8,500
                      </p>
                      <p className="text-[11px] text-white/70">
                        Room 204 &middot; Rahul Sharma &middot; Nov 2026
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                    Logged
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Actions */}
          <div className="lg:col-span-7 lg:pl-6">
            <div className="inline-flex rounded-full border border-line bg-surface px-4 py-1 text-caption font-medium text-purple-900">
              Honest Rent Tracking
            </div>

            <h2 className="mt-5 font-display text-h2 text-ink">
              All your rent dues, recorded without friction
            </h2>

            <p className="mt-4 text-lead text-ink-muted">
              Tenants pay at different times—some via UPI, some in cash, and
              some in two installments. Keep a crystal-clear record of who has
              paid, who owes what, and who is on notice period.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Clear breakdown of cash, UPI, and bank transfers",
                  desc: "Record the payment method for every rupee so your passbook and cash drawer balance at month-end.",
                },
                {
                  title: "Automatic calculation of remaining balance",
                  desc: "Partial payments immediately update the outstanding dues without needing formula adjustments.",
                },
                {
                  title: "Security deposit and advance deduction notes",
                  desc: "Track move-in deposits and adjust electricity or damage deductions during move-out with zero disputes.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="mt-1 flex size-5 flex-none items-center justify-center rounded-full bg-purple-100 text-purple-800">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="text-body font-medium text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-small text-ink-muted">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={brand.primaryCta.href}
                className="btn btn-lilac rounded-full px-6 py-2.5 text-small font-medium shadow-sm transition-transform hover:scale-[1.02]"
              >
                {brand.primaryCta.label}
              </a>
              <a
                href="#features"
                className="btn btn-ghost-on-light rounded-full px-6 py-2.5 text-small font-medium"
              >
                Learn how it works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
