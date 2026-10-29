"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

const workflows = [
  {
    id: "rent",
    title: "Instant UPI Rent Logging",
    speed: "15 seconds",
    desc: "Scan QR or match UPI reference instantly without checking bank apps.",
    stats: "₹8,500 credited · Room 202 · Zero manual math",
  },
  {
    id: "kyc",
    title: "Digital Aadhaar KYC & Agreement",
    speed: "30 seconds",
    desc: "Verify identity and store digital tenant agreement safely in one tap.",
    stats: "Aadhaar verified · Move-in scheduled · PDF stored",
  },
  {
    id: "receipts",
    title: "One-Tap WhatsApp Rent Slips",
    speed: "3 seconds",
    desc: "Send branded rent receipts directly to tenant & parent WhatsApp.",
    stats: "WhatsApp delivered · Ledger updated · Zero disputes",
  },
];

export function FlowSpeedShowcase() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        {/* Deep forest green container card matching wisprflow.ai */}
        <div
          data-surface="dark"
          className="relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-forest p-8 text-on-dark shadow-2xl md:p-14"
        >
          {/* Section title block */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[2.5rem] leading-[1.1] text-white sm:text-[3.5rem] md:text-[4rem]">
              4x faster{" "}
              <em className="font-serif italic font-normal text-emerald-300">
                than registers &amp; spreadsheets
              </em>
            </h2>
            <p className="mt-4 text-lead text-white/80">
              Hostel management that finally works is here. The platform lets you allocate rooms, record rent, and check vacancies at the speed of thought, 4x faster than manual notebooks.
            </p>
          </div>

          {/* Wispr Flow Speed Comparison Stage: Left 1x vs Right 4x */}
          <div className="mt-12 grid gap-6 lg:grid-cols-12 items-stretch">
            {/* Left Card: 45wpm equivalent (Paper Registers) */}
            <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">Manual</span>
                    <h3 className="font-display text-h3 text-white/90">Paper Registers</h3>
                  </div>
                  <span className="rounded-full bg-amber-400/20 px-3 py-1 font-mono text-caption font-bold text-amber-300 border border-amber-400/30">
                    15 mins / record
                  </span>
                </div>
                <p className="mt-4 text-small text-white/60">
                  Flipping through register pages, cross-checking WhatsApp screenshot UTRs, and manually writing paper slips.
                </p>
              </div>

              {/* Straight Marquee Tape (Slow 1x) */}
              <div className="mt-6 overflow-hidden rounded-xl bg-black/40 py-3 border border-white/5">
                <svg
                  viewBox="0 0 928 50"
                  width="100%"
                  height="45"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full"
                >
                  <path id="curve-straight-speed" d="M0 25 H2000" fill="none" stroke="transparent" />
                  <text x="0">
                    <textPath
                      href="#curve-straight-speed"
                      className="fill-white/40 text-xs font-mono font-medium tracking-wide"
                    >
                      Room 102 cash receipt in paper book... checking diary for Rahul pending dues... calculating month-end electricity meter differences by hand... searching WhatsApp chat for UPI screenshot... Room 102 cash receipt in paper book... checking diary for Rahul pending dues...
                      <animate
                        attributeName="x"
                        from="0"
                        to="-700"
                        dur="30s"
                        repeatCount="indefinite"
                      />
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Right Card: 220wpm equivalent (Platform Flow 4x) */}
            <div className="lg:col-span-8 relative overflow-hidden rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-black/70 to-emerald-950/40 p-6 md:p-8 shadow-2xl backdrop-blur-md">
              {/* Header with 4x badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-3.5 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">Platform Flow</span>
                    <h3 className="font-display text-h3 text-white">{brand.name} Operations</h3>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/25 px-4 py-1.5 font-mono text-small font-bold text-emerald-300 border border-emerald-400/40 shadow-sm">
                  15 seconds · 4x Faster
                </span>
              </div>

              {/* Fast Undulating Ribbon Marquee (4x Speed) */}
              <div className="relative mt-4 h-24 w-full overflow-hidden">
                <svg
                  viewBox="0 0 928 76"
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    id="curve-fast-speed"
                    d="M0.535156 74.7977C216.035 74.7977 283.147 0.534007 467.535 0.797575C650.383 1.05894 649.035 74.7977 927.535 74.7977"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text x="0">
                    <textPath
                      href="#curve-fast-speed"
                      className="fill-white text-sm font-semibold tracking-wide"
                    >
                      Instant UPI verified ₹8,500 · Room 103 Bed B assigned · Tenant KYC verified · WhatsApp receipt sent · Ledger synced · Instant UPI verified ₹8,500 · Room 103 Bed B assigned · Tenant KYC verified · WhatsApp receipt sent · Ledger synced ·
                      <animate
                        attributeName="x"
                        from="0"
                        to="-928"
                        dur="7s"
                        repeatCount="indefinite"
                      />
                    </textPath>
                  </text>
                </svg>

                {/* Pulsing Audio Waveform Equalizer Pill (Wispr Flow style) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full bg-forest-dark/90 px-4 py-2 border border-emerald-400/40 shadow-xl backdrop-blur-md">
                  <div className="flex items-end gap-1 h-5">
                    <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.1s] h-4" />
                    <span className="w-1 bg-emerald-300 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.2s] h-5" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s] h-3" />
                    <span className="w-1 bg-emerald-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.15s] h-5" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.25s] h-3" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.05s] h-2" />
                  </div>
                  <span className="text-[12px] font-mono font-medium text-emerald-300">Live Sync</span>
                </div>
              </div>

              {/* Interactive Workflow Switcher Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {workflows.map((wf, idx) => (
                  <button
                    key={wf.id}
                    type="button"
                    onClick={() => setActiveWorkflow(idx)}
                    className={`rounded-full px-4 py-1.5 text-caption font-medium transition-all ${
                      activeWorkflow === idx
                        ? "bg-emerald-400 text-forest-dark shadow-sm font-semibold"
                        : "bg-white/10 text-white/70 hover:bg-white/15"
                    }`}
                  >
                    {wf.title}
                  </button>
                ))}
              </div>

              {/* Active Workflow Card Preview */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-small font-semibold text-white">
                    {workflows[activeWorkflow].title}
                  </span>
                  <span className="text-caption font-mono text-emerald-300">
                    {workflows[activeWorkflow].speed}
                  </span>
                </div>
                <p className="mt-1 text-small text-white/70">
                  {workflows[activeWorkflow].desc}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-950/60 px-3 py-1 text-caption text-emerald-200 border border-emerald-400/20">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>{workflows[activeWorkflow].stats}</span>
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
