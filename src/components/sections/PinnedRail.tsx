"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";

type PinnedRailProps = {
  label: string;
  header: ReactNode;
  /** <li> cards, rendered on the server. */
  children: ReactNode;
};

const PIN_QUERY = "(min-width: 62rem) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(PIN_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Ref: Clarion "Implementation made easy". From 992px (and without reduced motion) the stage
 * sticks to the viewport and vertical scroll moves the track sideways, 1:1. Otherwise it is a
 * native scroll-snap rail. If the cards already fit, nothing is pinned.
 */
export function PinnedRail({ label, header, children }: PinnedRailProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const pinned = useSyncExternalStore(subscribe, () => window.matchMedia(PIN_QUERY).matches, () => false);

  useEffect(() => {
    const outer = outerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!pinned || !outer || !viewport || !track) return;

    let maxScroll = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      const progress = maxScroll > 0 ? Math.min(Math.max(-outer.getBoundingClientRect().top / maxScroll, 0), 1) : 0;
      track.style.transform = `translate3d(${-progress * maxScroll}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const measure = () => {
      maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
      outer.style.height = maxScroll > 0 ? `${window.innerHeight + maxScroll}px` : "";
      render();
    };
    // Keyboard: bring a focused off-screen card into view by scrolling the page.
    const onFocusIn = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest("li");
      if (!card || maxScroll <= 0) return;
      const target = Math.min(card.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), maxScroll);
      window.scrollTo({ top: window.scrollY + outer.getBoundingClientRect().top + Math.max(target, 0) });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    track.addEventListener("focusin", onFocusIn);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      track.removeEventListener("focusin", onFocusIn);
      outer.style.height = "";
      track.style.transform = "";
    };
  }, [pinned]);

  return (
    <div ref={outerRef} className="relative">
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden py-24" : "py-section"}>
        {header}
        <div
          ref={viewportRef}
          role="region"
          aria-label={label}
          tabIndex={pinned ? undefined : 0}
          className={pinned ? "overflow-visible" : "snap-x snap-mandatory scroll-px-(--spacing-gutter) overflow-x-auto pb-2"}
        >
          <ol
            ref={trackRef}
            className={[
              "flex w-max gap-3 px-(--spacing-gutter) md:gap-6",
              pinned ? "pr-[calc(var(--spacing-gutter)+60px)] will-change-transform lg:pl-[max(var(--spacing-gutter),calc((100vw-var(--container-site))/2))]" : "",
            ].join(" ")}
          >
            {children}
          </ol>
        </div>
      </div>
    </div>
  );
}
