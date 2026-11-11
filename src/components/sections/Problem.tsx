"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/config/site-content";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Homepage Problem Section
 * - Heading: "Running a hostel shouldn't mean chasing information across tools."
 * - Three pain-point cards in plain owner language:
 *   1. Rent tracked across three WhatsApp groups
 *   2. No idea which beds are free without walking the halls
 *   3. No record of who approved what
 * - Scroll reveal: Fade in + rise slightly on scroll, staggered ~60-80ms between cards, animates once
 * - Respects prefers-reduced-motion
 */
export function Problem() {
  const { problem } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect(); // Animate once
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Visual icon mapping helper
  const renderCardIcon = (
    icon: IconName,
    accent: "brick" | "amber" | "slate-ink",
  ) => {
    const accentClass =
      accent === "brick"
        ? "bg-brick/10 text-brick border-brick/20"
        : accent === "amber"
          ? "bg-amber/10 text-amber border-amber/20"
          : "bg-slate-ink/10 text-slate-ink border-slate-ink/20";

    return (
      <div
        className={`flex size-12 items-center justify-center rounded-btn border ${accentClass} shadow-xs`}
        aria-hidden="true"
      >
        <Icon name={icon} size={22} />
      </div>
    );
  };

  const getTagClass = (accent: "brick" | "amber" | "slate-ink") => {
    if (accent === "brick") return "tag tag-error";
    if (accent === "amber") return "tag tag-attention";
    return "tag tag-info";
  };

  return (
    <section
      ref={sectionRef}
      id="problem"
      aria-labelledby="problem-heading"
      className="py-16 md:py-24 bg-canvas-sand/40 border-y border-line"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-tag bg-sand px-3 py-1 font-body text-caption font-semibold uppercase tracking-wider text-bark shadow-xs">
            <span className="size-1.5 rounded-full bg-clay-600" />
            {problem.badge}
          </span>

          <h2
            id="problem-heading"
            className="mt-4 font-heading text-h2 font-medium tracking-tight text-espresso"
          >
            {problem.title}
          </h2>

          <p className="mt-4 font-body text-lead text-dust leading-relaxed max-w-2xl mx-auto">
            {problem.lead}
          </p>
        </div>

        {/* Three Pain-Point Cards Grid with Scroll-triggered Stagger */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {problem.cards.map((card, index) => (
            <article
              key={card.id}
              style={{
                transitionDelay: hasAnimated ? `${index * 70}ms` : "0ms",
              }}
              className={`problem-card card flex flex-col justify-between p-6 md:p-8 transition-all duration-(--dur-reveal) ease-standard ${
                hasAnimated
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  {renderCardIcon(card.icon, card.accent)}
                  <span className={getTagClass(card.accent)}>{card.tag}</span>
                </div>

                <h3 className="mt-6 font-heading text-h3 font-medium text-espresso leading-snug">
                  {card.title}
                </h3>

                <p className="mt-3 font-body text-body text-bark leading-relaxed">
                  {card.body}
                </p>
              </div>

              {/* Bottom Owner Quote / Observation */}
              <div className="mt-6 pt-4 border-t border-line/60">
                <span className="font-body text-caption font-medium text-dust flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-clay-600/50" />
                  Resolved on day 1 with dedicated account setup
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
