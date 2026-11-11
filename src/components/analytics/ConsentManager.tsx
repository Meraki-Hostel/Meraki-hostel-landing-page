"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  subscribeConsent,
  writeConsent,
  type ConsentState,
} from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaConfigured?: boolean;
  }
}

/** Defines gtag on demand; commands queue in dataLayer until gtag.js loads. */
function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // gtag.js requires the Arguments object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
}

/**
 * Cookie banner + Google Analytics 4, consent-gated.
 * Nothing is loaded and no cookie is set until the visitor accepts. Renders
 * nothing at all when no measurement ID is configured.
 */
export function ConsentManager({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore<ConsentState | "ssr">(
    subscribeConsent,
    readConsent,
    () => "ssr",
  );
  const [reopened, setReopened] = useState(false);

  // "Cookie settings" link in the footer reopens the banner.
  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  // Configure once after consent, then report each route change.
  useEffect(() => {
    if (!measurementId) return;
    if (consent !== "granted") {
      if (consent === "denied") {
        (window as unknown as Record<string, unknown>)[
          `ga-disable-${measurementId}`
        ] = true;
      }
      return;
    }
    (window as unknown as Record<string, unknown>)[
      `ga-disable-${measurementId}`
    ] = false;
    ensureGtag();
    if (!window.__gaConfigured) {
      window.__gaConfigured = true;
      window.gtag!("js", new Date());
      window.gtag!("config", measurementId, { send_page_view: false });
    }
    window.gtag!("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [consent, measurementId, pathname]);

  if (!measurementId) return null;

  const choose = (value: "granted" | "denied") => {
    writeConsent(value);
    setReopened(false);
  };

  const showBanner = consent === "unset" || (consent !== "ssr" && reopened);

  return (
    <>
      {consent === "granted" ? (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy="afterInteractive"
        />
      ) : null}

      {showBanner ? (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-card border border-line bg-cream p-4 shadow-dropdown sm:flex-row sm:items-center sm:p-5">
            <p className="font-body text-small leading-relaxed text-bark">
              We&rsquo;d like to use analytics cookies to see which pages are
              useful. Nothing is loaded unless you accept.{" "}
              <Link
                href="/privacy"
                className="font-medium text-clay-600 underline"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="btn btn-outline flex-1 justify-center sm:flex-none"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="btn btn-primary flex-1 justify-center sm:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
