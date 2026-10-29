"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NavLink } from "@/config/brand";

type SiteHeaderProps = {
  name: string;
  links: readonly NavLink[];
  cta: NavLink;
  /** "/" on the home page; "/" prefix makes anchors work from /privacy and /terms too. */
  base?: "" | "/";
};

const DESKTOP_QUERY = "(min-width: 62rem)";

/** Fixed pill nav (specs/05 §12). Below 992px the links move into a sheet. */
export function SiteHeader({ name, links, cta, base = "/" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // While open: lock scroll, make the page behind inert, close on Esc / outside click / desktop width.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const behind = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    root.style.overflow = "hidden";
    behind.forEach((el) => (el.inert = true));
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close(false);
    };
    const media = window.matchMedia(DESKTOP_QUERY);
    const onMedia = () => media.matches && close(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    media.addEventListener("change", onMedia);
    return () => {
      root.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      media.removeEventListener("change", onMedia);
    };
  }, [open, close]);

  // Keep Tab inside the header (toggle + sheet + CTA) while the sheet is open.
  const trapFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!open || event.key !== "Tab" || !headerRef.current) return;
    const focusable = Array.from(
      headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    ).filter((el) => el.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const href = (link: string) => `${base}${link}`;

  return (
    <header
      ref={headerRef}
      onKeyDown={trapFocus}
      className="fixed inset-x-0 top-2 z-50 px-4 md:px-6"
    >
      <div className="relative mx-auto flex h-14 max-w-[54.5rem] items-center justify-between rounded-nav border border-line bg-surface pr-2 pl-4 lg:pr-2.5 lg:pl-6">
        <a href={href("#hero")} className="inline-flex min-h-11 items-center rounded-sm font-display text-[1.375rem] leading-none text-ink no-underline" aria-label={`${name} home`}>
          {name}
        </a>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={href(link.href)}
                  className="inline-flex items-center rounded-full px-4 py-[11px] text-body leading-none font-medium text-ink no-underline transition-colors duration-(--dur-base) ease-out-quart hover:bg-line pointer-coarse:min-h-11"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a href={href(cta.href)} className="btn btn-primary-dark">
            {cta.label}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close(true) : setOpen(true))}
          >
            <span aria-hidden="true" className="relative block h-[13.5px] w-5">
              {[0, 1, 2].map((bar) => (
                <span
                  key={bar}
                  className={[
                    "absolute left-0 h-[1.5px] w-5 bg-ink transition duration-(--dur-base) ease-out-quart",
                    bar === 0 ? "top-0" : bar === 1 ? "top-[6px]" : "top-[12px]",
                    open && bar === 0 ? "translate-y-[6px] rotate-45" : "",
                    open && bar === 1 ? "opacity-0" : "",
                    open && bar === 2 ? "-translate-y-[6px] -rotate-45" : "",
                  ].join(" ")}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      <div
        id="nav-sheet"
        ref={sheetRef}
        hidden={!open}
        className="mx-auto mt-2 max-h-[calc(100svh-5.5rem)] max-w-[54.5rem] overflow-y-auto rounded-sheet border border-line bg-canvas p-2 lg:hidden"
      >
        <nav aria-label="Primary (mobile)">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={href(link.href)}
                  onClick={() => close(false)}
                  className="flex min-h-12 items-center rounded-xl px-4 py-3 text-lead font-medium text-ink no-underline hover:bg-canvas-tint"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
