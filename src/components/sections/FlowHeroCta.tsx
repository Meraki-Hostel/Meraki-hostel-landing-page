import Image from "next/image";
import { photos } from "@/config/images";
import { brand } from "@/config/brand";

export function FlowHeroCta() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        <div className="relative min-h-[460px] overflow-hidden rounded-[2.5rem] border border-line bg-dark-card shadow-2xl">
          <Image
            src={photos.finalCta.src}
            alt={photos.finalCta.alt}
            fill
            className="object-cover object-center brightness-75"
          />
          {/* Dark gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"
          />

          {/* Dotted winding curve across CTA matching Flow screenshot */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full stroke-white/20 [stroke-dasharray:6_6]"
            fill="none"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            <path
              d="M100,50 C300,10 400,280 600,200 C800,120 850,350 950,220"
              strokeWidth="1.5"
            />
          </svg>

          {/* Center content */}
          <div className="relative z-10 flex min-h-[460px] flex-col items-center justify-center p-8 text-center sm:p-12">
            <h2 className="font-display text-[2.75rem] md:text-[4.25rem] font-normal leading-tight text-white tracking-tight">
              Start operating in flow
            </h2>

            <p className="mt-4 max-w-xl text-lead text-white/80">
              Join hostel owners and PG operators who are leaving paperwork
              behind and taking control of their properties.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href={brand.primaryCta.href}
                className="btn btn-lilac btn-lg rounded-full px-8 py-3.5 text-body font-medium shadow-sm transition-transform hover:scale-[1.02]"
              >
                {brand.primaryCta.label}
              </a>
              <a
                href="#faq"
                className="btn btn-white btn-lg rounded-full px-6 py-3.5 text-body font-medium"
              >
                Read the FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
