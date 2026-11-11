"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { brand } from "@/config/brand";
import { ButtonLink } from "@/components/ui/Button";

/** Pages where a persistent "buy" prompt makes sense. Never on checkout, the
 * contact form, legal pages or pricing (which already is the plan list). */
const SHOW_ON = new Set(["/", "/about"]);

/** Appears once the hero has scrolled away, on phones only (below the md breakpoint). */
const SCROLL_THRESHOLD = 480;

export function StickyMobileCta() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!SHOW_ON.has(pathname)) return null;

  return (
    <>
      {/* Keeps the footer's last line clear of the fixed bar. */}
      <div aria-hidden="true" className="h-20 bg-sand/60 md:hidden" />
      <div
        inert={!scrolled}
        className={[
          "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 pt-3 shadow-dropdown backdrop-blur md:hidden",
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          "transition-transform duration-(--dur-ui) ease-standard motion-reduce:transition-none",
          scrolled ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <ButtonLink
          href={brand.primaryCta.href}
          variant="primary"
          size="lg"
          className="w-full justify-center font-medium"
        >
          {brand.primaryCta.label}
        </ButtonLink>
      </div>
    </>
  );
}
