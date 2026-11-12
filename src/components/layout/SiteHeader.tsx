"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { brand, type NavLink } from "@/config/brand";
import { logo } from "@/config/images";

export type SiteHeaderProps = {
  name?: string;
  links?: readonly NavLink[];
  cta?: NavLink;
  /** "/" on the home page; "/" prefix makes anchors work from /privacy, /terms, and /refund too. */
  base?: "" | "/";
};

const DESKTOP_QUERY = "(min-width: 62rem)";

/**
 * Shared Site Header
 * - Logo wordmark in warm serif Fraunces
 * - Nav links: Home, Pricing, How it Works, FAQ, About, Contact
 * - CTA button: "See Plans"
 * - Mobile responsive drawer sheet with focus trapping and accessible ARIA attributes
 * - Card radius 1.125rem, button radius 0.75rem, soft layered shadows
 */
export function SiteHeader({
  name = brand.name,
  links = brand.nav,
  cta = brand.primaryCta,
  base = "/",
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Lock scroll, inert background, handle Esc / click outside / desktop resize while mobile sheet is open
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const behind = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
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

  // Trap focus within header while drawer is open
  const trapFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!open || event.key !== "Tab" || !headerRef.current) return;
    const focusable = Array.from(
      headerRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      ),
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

  const href = (link: string) =>
    link.startsWith("#") ? `${base}${link}` : link;

  return (
    <header
      ref={headerRef}
      onKeyDown={trapFocus}
      className="fixed inset-x-0 top-3 z-50 px-4 md:px-6"
    >
      <div className="relative mx-auto flex h-16 max-w-[68rem] items-center justify-between rounded-card border border-line bg-cream/95 px-4 shadow-card backdrop-blur-md md:px-6">
        {/* Logo mark + wordmark in Fraunces serif */}
        <a
          href={href("#hero")}
          className="inline-flex min-h-11 items-center gap-2 font-heading text-h3 font-medium tracking-tight text-espresso no-underline transition-colors duration-(--dur-ui) ease-standard hover:text-clay-600 focus-visible:rounded-btn"
          aria-label={`${name} home`}
        >
          <Image
            src={logo.src}
            alt=""
            aria-hidden="true"
            className="h-11 w-auto"
            priority
          />
          {name}
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={href(link.href)}
                  className="inline-flex min-h-11 items-center rounded-btn px-3.5 py-2 font-body text-body font-medium text-bark no-underline transition-colors duration-(--dur-ui) ease-standard hover:bg-clay-100 hover:text-clay-600 focus-visible:rounded-btn"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <a
            href={href(cta.href)}
            className="btn btn-primary hidden rounded-btn font-medium sm:inline-flex"
          >
            {cta.label}
          </a>

          {/* Mobile hamburger button */}
          <button
            ref={toggleRef}
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-btn border border-line bg-cream text-espresso transition-colors duration-(--dur-ui) ease-standard hover:bg-clay-100 hover:text-clay-600 lg:hidden"
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
                    "absolute left-0 h-[1.5px] w-5 bg-espresso transition-all duration-(--dur-ui) ease-standard",
                    bar === 0
                      ? "top-0"
                      : bar === 1
                        ? "top-[6px]"
                        : "top-[12px]",
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

      {/* Mobile drawer sheet */}
      <div
        id="nav-sheet"
        ref={sheetRef}
        hidden={!open}
        className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[68rem] overflow-y-auto rounded-card border border-line bg-cream p-4 shadow-dropdown transition-all duration-(--dur-ui) ease-standard lg:hidden"
      >
        <nav aria-label="Primary (mobile)">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={href(link.href)}
                  onClick={() => close(false)}
                  className="flex min-h-12 items-center rounded-btn px-4 py-3 font-body text-lead font-medium text-espresso no-underline transition-colors duration-(--dur-ui) ease-standard hover:bg-clay-100 hover:text-clay-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Below 480px the header CTA is hidden so the wordmark isn't squeezed; it lives here instead. */}
        <a
          href={href(cta.href)}
          onClick={() => close(false)}
          className="btn btn-primary mt-3 w-full justify-center font-medium sm:hidden"
        >
          {cta.label}
        </a>
      </div>
    </header>
  );
}
