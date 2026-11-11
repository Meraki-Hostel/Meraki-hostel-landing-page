import { brand } from "@/config/brand";
import { content } from "@/config/site-content";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Homepage Hero Section
 * - Confident headline naming real pain (manual rent tracking, zero property visibility) + resolution
 * - Primary CTA "See Plans" -> /pricing
 * - Secondary link "See how it works" -> #how-it-works
 * - Labeled placeholder for a real product screenshot
 * - Page-load staggered entrance animation (ease cubic-bezier(0.2, 0.8, 0.2, 1), up to 450ms)
 * - Pure design-system tokens (no raw hex codes, rename-safe via brand.name)
 */
export function Hero() {
  const { hero } = content;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-canvas"
    >
      <div className="container-page">
        {/* Content Column */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow badge (Stagger 1) */}
          <div className="hero-stagger-1 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-tag bg-clay-100 px-3.5 py-1.5 font-body text-caption font-semibold uppercase tracking-wider text-clay-600 shadow-xs">
              <span className="size-2 rounded-full bg-clay-600" />
              {hero.badge}
            </span>
          </div>

          {/* Main Headline (Stagger 2) */}
          <h1
            id="hero-heading"
            className="hero-stagger-2 mt-6 font-heading text-h1 font-medium tracking-tight text-espresso leading-[1.1]"
          >
            {hero.headlineProblem}
            <span className="mt-2 block text-clay-600">
              {hero.headlineResolution}
            </span>
          </h1>

          {/* Subhead (Stagger 3) */}
          <p className="hero-stagger-3 mx-auto mt-6 max-w-2xl font-body text-lead text-bark leading-relaxed">
            {hero.lead}
          </p>

          {/* Action CTAs (Stagger 4) */}
          <div className="hero-stagger-4 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink
              href={hero.primaryCta.href}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-medium"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-medium"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          {/* Trust points */}
          <div className="hero-stagger-4 mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-small text-dust">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={14} className="text-moss" />
              Assisted Team Onboarding
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={14} className="text-moss" />
              Tailored for PG & Hostel Owners
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" size={14} className="text-moss" />
              No Self-Serve Confusion
            </span>
          </div>
        </div>

        {/* Labeled Placeholder for Real Product Screenshot (Stagger 5) */}
        <div className="hero-stagger-5 mt-12 md:mt-16">
          <div className="mx-auto max-w-5xl">
            {/* Outer Window Container with Card Radius 1.125rem & Soft Layered Shadow */}
            <div className="rounded-card border border-line bg-cream shadow-dropdown overflow-hidden">
              {/* Window Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-sand/60 px-4 py-3 md:px-6">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-brick/70" />
                  <span className="size-3 rounded-full bg-amber/70" />
                  <span className="size-3 rounded-full bg-moss/70" />
                  <span className="ml-3 font-body text-caption font-medium text-bark hidden sm:inline">
                    {brand.name} Operations Hub · Greenfield Residency (48 Beds)
                  </span>
                </div>

                {/* Explicit Product Screenshot Placeholder Label */}
                <div className="flex items-center gap-2">
                  <span className="tag tag-info">
                    <Icon name="layout" size={12} />
                    {hero.previewCaption}
                  </span>
                  <span className="tag tag-attention hidden md:inline-flex">
                    Real Interface Mockup
                  </span>
                </div>
              </div>

              {/* Inside Mockup UI Content */}
              <div className="p-4 md:p-8 space-y-6 bg-cream">
                {/* Property Stats Bar */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                  <div className="rounded-card border border-line bg-canvas p-3.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-caption text-dust">
                        Occupancy
                      </span>
                      <span className="tag tag-success text-[0.7rem] px-1.5 py-0.5">
                        5 Vacant
                      </span>
                    </div>
                    <p className="mt-1 font-heading text-[1.5rem] font-medium text-espresso">
                      43{" "}
                      <span className="text-caption text-dust font-normal">
                        / 48 Beds
                      </span>
                    </p>
                    <p className="mt-0.5 font-body text-[0.75rem] text-moss font-medium">
                      90% Occupancy Rate
                    </p>
                  </div>

                  <div className="rounded-card border border-line bg-canvas p-3.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-caption text-dust">
                        Collected This Month
                      </span>
                      <span className="tag tag-success text-[0.7rem] px-1.5 py-0.5">
                        92%
                      </span>
                    </div>
                    <p className="mt-1 font-heading text-[1.5rem] font-medium text-espresso">
                      ₹3,44,000
                    </p>
                    <p className="mt-0.5 font-body text-[0.75rem] text-dust">
                      ₹3,72,500 Expected
                    </p>
                  </div>

                  <div className="rounded-card border border-line bg-canvas p-3.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-caption text-dust">
                        Pending Dues
                      </span>
                      <span className="tag tag-attention text-[0.7rem] px-1.5 py-0.5">
                        4 Tenants
                      </span>
                    </div>
                    <p className="mt-1 font-heading text-[1.5rem] font-medium text-amber">
                      ₹28,500
                    </p>
                    <p className="mt-0.5 font-body text-[0.75rem] text-dust">
                      Follow-ups active
                    </p>
                  </div>

                  <div className="rounded-card border border-line bg-canvas p-3.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-caption text-dust">
                        Move-outs
                      </span>
                      <span className="tag tag-info text-[0.7rem] px-1.5 py-0.5">
                        This Week
                      </span>
                    </div>
                    <p className="mt-1 font-heading text-[1.5rem] font-medium text-espresso">
                      2 Beds
                    </p>
                    <p className="mt-0.5 font-body text-[0.75rem] text-dust">
                      Scheduled cleanings
                    </p>
                  </div>
                </div>

                {/* Two-Column Operational Matrix & Ledger Preview */}
                <div className="grid gap-6 lg:grid-cols-12">
                  {/* Left: Bed Allocations Matrix (7 cols) */}
                  <div className="lg:col-span-7 rounded-card border border-line bg-canvas p-4 md:p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-line">
                      <div>
                        <h4 className="font-heading text-body font-medium text-espresso">
                          Live Room & Bed Allocations
                        </h4>
                        <p className="font-body text-caption text-dust">
                          Instant visibility without walking corridors
                        </p>
                      </div>
                      <span className="font-mono text-caption text-clay-600 font-medium">
                        Floor 1
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {/* Room 101 */}
                      <div className="rounded-btn border border-line bg-cream p-2.5">
                        <div className="flex items-center justify-between font-body text-caption font-semibold text-espresso">
                          <span>Room 101</span>
                          <span className="text-[0.6875rem] text-moss">
                            Full
                          </span>
                        </div>
                        <div className="mt-2 flex gap-1.5">
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed A
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed B
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed C
                          </span>
                        </div>
                      </div>

                      {/* Room 102 */}
                      <div className="rounded-btn border border-amber/40 bg-amber/5 p-2.5">
                        <div className="flex items-center justify-between font-body text-caption font-semibold text-espresso">
                          <span>Room 102</span>
                          <span className="text-[0.6875rem] font-semibold text-amber">
                            1 Free
                          </span>
                        </div>
                        <div className="mt-2 flex gap-1.5">
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed A
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm border border-amber/40 bg-cream text-[0.6875rem] font-semibold text-amber">
                            Vacant
                          </span>
                        </div>
                      </div>

                      {/* Room 103 */}
                      <div className="rounded-btn border border-line bg-cream p-2.5">
                        <div className="flex items-center justify-between font-body text-caption font-semibold text-espresso">
                          <span>Room 103</span>
                          <span className="text-[0.6875rem] text-moss">
                            Full
                          </span>
                        </div>
                        <div className="mt-2 flex gap-1.5">
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed A
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed B
                          </span>
                        </div>
                      </div>

                      {/* Room 201 */}
                      <div className="rounded-btn border border-line bg-cream p-2.5">
                        <div className="flex items-center justify-between font-body text-caption font-semibold text-espresso">
                          <span>Room 201</span>
                          <span className="text-[0.6875rem] text-moss">
                            Full
                          </span>
                        </div>
                        <div className="mt-2 flex gap-1.5">
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed A
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed B
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed C
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed D
                          </span>
                        </div>
                      </div>

                      {/* Room 202 */}
                      <div className="rounded-btn border border-amber/40 bg-amber/5 p-2.5">
                        <div className="flex items-center justify-between font-body text-caption font-semibold text-espresso">
                          <span>Room 202</span>
                          <span className="text-[0.6875rem] font-semibold text-amber">
                            1 Free
                          </span>
                        </div>
                        <div className="mt-2 flex gap-1.5">
                          <span className="flex-1 py-1 text-center rounded-sm border border-amber/40 bg-cream text-[0.6875rem] font-semibold text-amber">
                            Vacant
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed B
                          </span>
                        </div>
                      </div>

                      {/* Room 203 */}
                      <div className="rounded-btn border border-line bg-cream p-2.5">
                        <div className="flex items-center justify-between font-body text-caption font-semibold text-espresso">
                          <span>Room 203</span>
                          <span className="text-[0.6875rem] text-moss">
                            Full
                          </span>
                        </div>
                        <div className="mt-2 flex gap-1.5">
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed A
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed B
                          </span>
                          <span className="flex-1 py-1 text-center rounded-sm bg-moss/15 text-[0.6875rem] font-medium text-moss">
                            Bed C
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Rent Ledger Entries (5 cols) */}
                  <div className="lg:col-span-5 rounded-card border border-line bg-canvas p-4 md:p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-line">
                      <div>
                        <h4 className="font-heading text-body font-medium text-espresso">
                          Recent Rent Records
                        </h4>
                        <p className="font-body text-caption text-dust">
                          Logged with receipt details
                        </p>
                      </div>
                      <span className="tag tag-success text-[0.7rem]">
                        Live Records
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between rounded-btn border border-line bg-cream p-2.5 text-small">
                        <div>
                          <p className="font-body font-medium text-espresso">
                            Aarav Sharma
                          </p>
                          <p className="text-[0.75rem] text-dust">
                            Room 101-A · Nov 02
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-espresso">₹8,500</p>
                          <span className="chip chip-paid">Paid</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-btn border border-line bg-cream p-2.5 text-small">
                        <div>
                          <p className="font-body font-medium text-espresso">
                            Rohan Gupta
                          </p>
                          <p className="text-[0.75rem] text-dust">
                            Room 103-A · Due Nov 05
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-espresso">₹7,500</p>
                          <span className="chip chip-due">Due</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-btn border border-line bg-cream p-2.5 text-small">
                        <div>
                          <p className="font-body font-medium text-espresso">
                            Sneha Iyer
                          </p>
                          <p className="text-[0.75rem] text-dust">
                            Room 201-C · Due Oct 28
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-espresso">₹8,000</p>
                          <span className="chip chip-overdue">Overdue</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Status Ribbon */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-btn border border-line bg-sand/40 px-4 py-2.5 text-small text-bark">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-moss" />
                    <span>
                      Real-time sync between rooms, beds, and rent logs
                    </span>
                  </div>
                  <span className="font-mono text-caption text-dust">
                    {hero.previewLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
