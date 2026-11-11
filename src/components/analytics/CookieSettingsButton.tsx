"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";

/** Footer control that lets a visitor change their analytics choice later. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      Cookie settings
    </button>
  );
}
