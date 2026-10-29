"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

export function FlowBottomBar() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <aside
      aria-label="Quick Access"
      className="fixed inset-x-4 bottom-5 z-40 mx-auto max-w-md transition-all duration-300 animate-[fadeIn_0.5s_ease-out]"
    >
      <div className="flex items-center justify-between rounded-full border border-dark-card-border bg-dark-card/95 p-2 pl-3 shadow-2xl backdrop-blur-md text-on-dark ring-1 ring-white/10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setClosed(true)}
            aria-label="Close bottom bar"
            className="flex size-7 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          >
            &times;
          </button>

          {/* Wispr Flow-style animated soundwave equalizer indicator */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-end gap-0.5 h-4 px-1" aria-hidden="true">
              <span className="w-0.5 rounded-full bg-emerald-400 h-2 animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 rounded-full bg-emerald-400 h-3.5 animate-[pulse_0.4s_ease-in-out_infinite_0.1s]" />
              <span className="w-0.5 rounded-full bg-emerald-300 h-4 animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 rounded-full bg-emerald-400 h-2.5 animate-[pulse_0.7s_ease-in-out_infinite_0.3s]" />
              <span className="w-0.5 rounded-full bg-emerald-400 h-3 animate-[pulse_0.4s_ease-in-out_infinite_0.15s]" />
            </div>

            <div>
              <p className="text-small font-semibold leading-tight text-white">
                {brand.name}
              </p>
              <p className="text-[11px] text-white/60">
                4x faster hostel operations
              </p>
            </div>
          </div>
        </div>

        <a
          href={brand.primaryCta.href}
          className="btn btn-lilac rounded-full px-4 py-2 text-caption font-medium shadow-xs"
        >
          {brand.primaryCta.label}
        </a>
      </div>
    </aside>
  );
}
