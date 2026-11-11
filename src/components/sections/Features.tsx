"use client";

import { useState } from "react";
import { content } from "@/config/site-content";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Homepage Features Section
 * - Grouped into three groups: Billing, Operations, Communication
 * - Each card states the outcome first, the mechanism second
 * - Card radius 1.125rem, soft layered shadows, secondary accents for tags/icons
 * - Pure tokens-only (no raw hex codes, rename-safe)
 */
export function Features() {
  const { features } = content;
  const [activeGroup, setActiveGroup] = useState<
    "billing" | "operations" | "communication"
  >("billing");

  const currentGroup =
    features.groups.find((g) => g.id === activeGroup) ?? features.groups[0];

  const renderIcon = (
    icon: IconName,
    accent: "moss" | "amber" | "slate-ink" | "brick",
  ) => {
    const accentClass =
      accent === "moss"
        ? "bg-moss/10 text-moss border-moss/20"
        : accent === "amber"
          ? "bg-amber/10 text-amber border-amber/20"
          : accent === "brick"
            ? "bg-brick/10 text-brick border-brick/20"
            : "bg-slate-ink/10 text-slate-ink border-slate-ink/20";

    return (
      <div
        className={`flex size-11 items-center justify-center rounded-btn border ${accentClass} shadow-xs flex-none`}
        aria-hidden="true"
      >
        <Icon name={icon} size={20} />
      </div>
    );
  };

  const getTagClass = (accent: "moss" | "amber" | "slate-ink" | "brick") => {
    if (accent === "moss") return "tag tag-success";
    if (accent === "amber") return "tag tag-attention";
    if (accent === "brick") return "tag tag-error";
    return "tag tag-info";
  };

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-16 md:py-24 bg-canvas border-b border-line"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            {features.eyebrow}
          </span>

          <h2
            id="features-heading"
            className="mt-4 font-heading text-h2 font-medium tracking-tight text-espresso"
          >
            {features.title}
          </h2>

          <p className="mt-4 font-body text-lead text-dust leading-relaxed max-w-2xl mx-auto">
            {features.lead}
          </p>
        </div>

        {/* Group Selector Navigation */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Feature groups"
            className="inline-flex flex-wrap items-center justify-center gap-2 rounded-card border border-line bg-cream p-1.5 shadow-sm"
          >
            {features.groups.map((group) => {
              const isActive = activeGroup === group.id;
              return (
                <button
                  key={group.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${group.id}`}
                  id={`tab-${group.id}`}
                  onClick={() =>
                    setActiveGroup(
                      group.id as "billing" | "operations" | "communication",
                    )
                  }
                  type="button"
                  className={[
                    "inline-flex min-h-11 items-center gap-2 rounded-btn px-5 py-2.5 font-body text-body font-medium transition-all duration-(--dur-ui) ease-standard cursor-pointer",
                    isActive
                      ? "bg-clay-600 text-cream shadow-sm"
                      : "text-bark hover:bg-clay-100 hover:text-clay-600",
                  ].join(" ")}
                >
                  <Icon
                    name={
                      group.id === "billing"
                        ? "rupee"
                        : group.id === "operations"
                          ? "wrench"
                          : "bell"
                    }
                    size={16}
                  />
                  <span>{group.title}</span>
                  <span
                    className={[
                      "ml-1.5 rounded-tag px-1.5 py-0.5 text-micro font-semibold leading-none",
                      isActive ? "bg-cream/20 text-cream" : "bg-sand text-dust",
                    ].join(" ")}
                  >
                    {group.cards.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Group Description */}
        <div className="mt-6 mx-auto max-w-xl text-center">
          <p className="font-body text-small text-bark leading-relaxed">
            <span className="font-semibold text-espresso">
              {currentGroup.eyebrow}:
            </span>{" "}
            {currentGroup.description}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          role="tabpanel"
          id={`panel-${currentGroup.id}`}
          aria-labelledby={`tab-${currentGroup.id}`}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {currentGroup.cards.map((card) => (
            <article
              key={card.id}
              className="card flex flex-col justify-between p-6 md:p-7 shadow-card transition-all duration-(--dur-ui) ease-standard hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div>
                {/* Card Top: Icon & Tag */}
                <div className="flex items-center justify-between gap-3">
                  {renderIcon(card.icon, card.accent)}
                  <span className={getTagClass(card.accent)}>{card.tag}</span>
                </div>

                {/* Feature Title */}
                <h3 className="mt-5 font-heading text-h3 font-medium text-espresso leading-snug">
                  {card.title}
                </h3>

                {/* Outcome Statement (Outcome First) */}
                <div className="mt-4 rounded-btn border border-line bg-canvas/80 p-3.5">
                  <span className="font-body text-caption font-semibold uppercase tracking-wider text-dust block mb-1">
                    Outcome
                  </span>
                  <p className="font-body text-body font-medium text-espresso leading-relaxed">
                    {card.outcome}
                  </p>
                </div>

                {/* Mechanism Statement (Mechanism Second) */}
                <div className="mt-3.5">
                  <span className="font-body text-caption font-semibold uppercase tracking-wider text-dust block mb-1">
                    How it works
                  </span>
                  <p className="font-body text-small text-bark leading-relaxed">
                    {card.mechanism}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Status Line */}
              <div className="mt-6 pt-3.5 border-t border-line/60 flex items-center justify-between text-caption text-dust font-medium">
                <span>Active in all paid tiers</span>
                <span className="text-moss flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-moss" />
                  Live feature
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
