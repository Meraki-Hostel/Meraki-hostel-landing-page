import Image from "next/image";
import { photos } from "@/config/images";
import { brand } from "@/config/brand";

export function FlowSpeedShowcase() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        {/* Section title block */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-h2 tracking-tight text-ink">
            <span className="underline decoration-purple-400 decoration-wavy underline-offset-8">
              4x faster
            </span>{" "}
            than notebooks &amp; spreadsheets
          </h2>
          <p className="mt-4 text-lead text-ink-muted">
            Built for speed and precision. Check vacancy in 2 seconds, record
            payments with one tap, and never lose tenant KYC.
          </p>

          {/* Mode pills */}
          <div className="mt-6 inline-flex rounded-full border border-line bg-surface p-1 shadow-xs">
            <button
              type="button"
              className="rounded-full bg-forest px-4 py-1.5 text-caption font-medium text-white shadow-xs"
            >
              Single PG Mode
            </button>
            <button
              type="button"
              className="rounded-full px-4 py-1.5 text-caption font-medium text-ink-muted hover:text-ink"
            >
              Campus Hostel Mode
            </button>
          </div>
        </div>

        {/* Dual card showcase */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left card */}
          <div className="flex flex-col justify-between rounded-[2rem] border border-line bg-canvas-tint p-8 lg:col-span-4 lg:p-10">
            <div>
              <div className="inline-flex rounded-full bg-surface px-3 py-1 text-caption font-medium text-purple-900 border border-line">
                Zero manual counting
              </div>
              <h3 className="mt-6 font-display text-[1.75rem] leading-tight text-ink">
                Instant vacancy at a single glance
              </h3>
              <p className="mt-3 text-body text-ink-muted">
                No need to walk corridor to corridor or flip through pages.
                Every occupied and vacant bed is color-coded live so you can
                quote openings to inquiring parents immediately.
              </p>
            </div>

            <div className="mt-8 border-t border-line/60 pt-6">
              <a
                href={brand.primaryCta.href}
                className="inline-flex items-center gap-1.5 text-small font-medium text-ink hover:underline"
              >
                <span>See vacancy workflow</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right card with photo and soundwave/status pill overlay */}
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-line bg-dark-card shadow-xl lg:col-span-8">
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              className="object-cover object-center brightness-90 transition-transform duration-700 hover:scale-105"
            />
            {/* Dark gradient overlay for text readability */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"
            />

            {/* Overlaid headline */}
            <div className="absolute top-8 left-8 right-8 text-center sm:text-left">
              <span className="rounded-full bg-white/20 px-3 py-1 text-caption font-medium text-white backdrop-blur-md">
                Live Status
              </span>
              <p className="mt-3 font-display text-2xl text-white sm:text-3xl">
                Always accurate, always up to date
              </p>
            </div>

            {/* Floating audio wave / status pill widget matching Flow aesthetic */}
            <div className="absolute bottom-6 left-6 right-6 mx-auto max-w-lg rounded-2xl border border-white/20 bg-black/60 p-4 shadow-2xl backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="relative flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
                  </span>
                  <div>
                    <p className="text-small font-medium text-white">
                      Room 103 &middot; Bed B (Vacant)
                    </p>
                    <p className="text-[11px] text-white/70">
                      Standard Double Sharing &middot; ₹8,500/mo
                    </p>
                  </div>
                </div>

                {/* Animated sound wave bars */}
                <div className="flex items-center gap-1" aria-hidden="true">
                  <span className="h-3 w-1 rounded-full bg-purple-400 animate-pulse" />
                  <span className="h-6 w-1 rounded-full bg-purple-300 animate-pulse [animation-delay:150ms]" />
                  <span className="h-4 w-1 rounded-full bg-purple-200 animate-pulse [animation-delay:300ms]" />
                  <span className="h-7 w-1 rounded-full bg-purple-400 animate-pulse [animation-delay:450ms]" />
                  <span className="h-5 w-1 rounded-full bg-purple-300 animate-pulse [animation-delay:200ms]" />
                  <span className="h-2 w-1 rounded-full bg-purple-400 animate-pulse [animation-delay:350ms]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
