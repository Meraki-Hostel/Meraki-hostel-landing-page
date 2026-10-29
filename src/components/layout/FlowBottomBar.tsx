"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

export function FlowBottomBar() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <aside aria-label="Quick Access" className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-lg transition-transform duration-300">
      <div className="flex items-center justify-between rounded-full border border-line bg-surface/95 p-2 pl-3 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setClosed(true)}
            aria-label="Close bottom bar"
            className="flex size-7 items-center justify-center rounded-full text-ink-muted hover:bg-canvas-tint hover:text-ink"
          >
            &times;
          </button>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-ink" aria-hidden="true">
              <span className="size-1.5 rounded-full bg-ink" />
              <span className="size-1.5 rounded-full bg-ink" />
              <span className="size-1.5 rounded-full bg-ink" />
              <span className="size-1.5 rounded-full bg-ink" />
            </span>
            <div>
              <p className="text-small font-semibold leading-tight text-ink">
                {brand.name}
              </p>
              <p className="text-[11px] text-ink-muted">
                Run 4x faster &middot; Free early access
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
