"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = { id: string; label: string; description: string };

type PlatformTabsProps = {
  title: string;
  tabs: Tab[];
  /** Server-rendered previews, keyed by tab id. */
  panels: Record<string, ReactNode>;
  cta: ReactNode;
};

/**
 * WAI-ARIA tabs (automatic activation). Selecting a tab swaps both the description and the
 * preview (specs/01 FR-20–FR-25). Without JS every panel renders in sequence.
 */
export function PlatformTabs({ title, tabs, panels, cta }: PlatformTabsProps) {
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Progressive enhancement: switch from the plain list to tabs once JS has run.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setEnhanced(true), []);

  const select = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => select(active + 1),
      ArrowDown: () => select(active + 1),
      ArrowLeft: () => select(active - 1),
      ArrowUp: () => select(active - 1),
      Home: () => select(0),
      End: () => select(tabs.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2">
      {/* Media: preview for the active tab */}
      <div className="order-2 flex min-w-0 items-center bg-canvas-tint p-6 md:p-10 lg:order-1 lg:p-12">
        <div className={enhanced ? "tab-stack w-full min-w-0 grid-cols-[minmax(0,1fr)]" : "w-full min-w-0 space-y-10"}>
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={enhanced ? "tab-panel" : undefined}
              data-active={enhanced ? String(index === active) : undefined}
              aria-hidden={enhanced && index !== active ? true : undefined}
            >
              {panels[tab.id]}
            </div>
          ))}
        </div>
      </div>

      {/* Dark panel: heading, tabs, description, one shared CTA */}
      <div data-surface="dark" className="order-1 flex min-w-0 flex-col bg-accent-800 px-6 pt-10 pb-4 text-on-dark md:px-8 lg:order-2 lg:p-[60px] lg:pb-[60px]">
        <h2 id="platform-title" tabIndex={-1} className="text-h2 focus:outline-none">
          {title}
        </h2>

        {enhanced ? (
          <>
            <div
              role="tablist"
              aria-labelledby="platform-title"
              className="-mx-6 mt-8 flex gap-2 overflow-x-auto border-b border-on-dark/12 px-6 pb-6 md:-mx-8 md:px-8 lg:mx-0 lg:flex-col lg:items-start lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-10"
            >
              {tabs.map((tab, index) => {
                const selected = index === active;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls={`tabpanel-${tab.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={onKeyDown}
                    className={[
                      "min-h-11 flex-none py-2 text-left font-display text-tab whitespace-nowrap transition-opacity duration-(--dur-base) ease-out-quart",
                      selected ? "opacity-100" : "opacity-60 hover:opacity-80",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="tab-stack mt-6">
              {tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  role="tabpanel"
                  id={`tabpanel-${tab.id}`}
                  aria-labelledby={`tab-${tab.id}`}
                  data-active={String(index === active)}
                  className="tab-panel"
                >
                  <p className="max-w-[28.5rem] text-on-dark-muted">{tab.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <dl className="mt-8 space-y-6">
            {tabs.map((tab) => (
              <div key={tab.id}>
                <dt className="font-display text-tab">{tab.label}</dt>
                <dd className="mt-2 max-w-[28.5rem] text-on-dark-muted">{tab.description}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-8 lg:mt-auto lg:pt-10">{cta}</div>
      </div>
    </div>
  );
}
