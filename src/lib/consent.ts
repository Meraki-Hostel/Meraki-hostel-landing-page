/** Browser-side analytics consent. Client-only; every storage access is guarded
 * because storage can be blocked (private windows, strict settings). */

export type ConsentState = "granted" | "denied" | "unset";

const KEY = "consent.analytics";
export const CONSENT_EVENT = "consent:change";
export const OPEN_CONSENT_EVENT = "consent:open";

export function readConsent(): ConsentState {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

export function writeConsent(value: Exclude<ConsentState, "unset">) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked: the choice still applies for this page view via the event.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
