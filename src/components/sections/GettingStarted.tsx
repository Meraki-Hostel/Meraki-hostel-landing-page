import { content } from "@/config/site-content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PinnedRail } from "@/components/sections/PinnedRail";
import Image from "next/image";
import { photos } from "@/config/images";

/** Dark band with a pinned horizontal rail on desktop, swipeable cards on mobile (ref: Clarion implementation). */
export function GettingStarted() {
  const { title, lead, steps } = content.gettingStarted;
  return (
    <section id="getting-started" aria-labelledby="getting-started-title" data-surface="dark" className="bg-accent-900 text-on-dark">
      <PinnedRail
        label="Early-access steps"
        header={
          <div className="container-page">
            <SectionHeader title={title} titleId="getting-started-title" lead={lead} onDark />
          </div>
        }
      >
        {steps.map((step, index) => (
          <li key={step.title} className="flex w-[18rem] flex-none snap-start flex-col md:w-[22rem] lg:w-[26.5rem]">
            {/* Ref: Clarion implementation cards: tall square-cornered media, then sentence headline. */}
            <div className="relative h-56 overflow-hidden bg-accent-800 md:h-64 lg:h-[clamp(14rem,36svh,28rem)]">
              <Image
                src={photos.steps[index].src}
                alt={photos.steps[index].alt}
                fill
                sizes="(min-width: 62rem) 26.5rem, (min-width: 48rem) 22rem, 18rem"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <p className="mt-5 text-caption text-on-dark-muted">
              Step {index + 1} of {steps.length}
            </p>
            <h3 className="mt-2 text-h3">{step.title}</h3>
            <p className="mt-3 max-w-[34ch] text-small text-on-dark-muted">{step.body}</p>
          </li>
        ))}
      </PinnedRail>
    </section>
  );
}
