import Image from "next/image";
import { brand } from "@/config/brand";
import { content } from "@/config/site-content";
import { photos } from "@/config/images";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Ref: Clarion final CTA. Full-bleed photo with a 139° accent wash from the top-left and
 * left-aligned copy. Below 768px the photo moves under the copy and fades in from the top,
 * so the text never sits on a busy part of the image.
 */
export function FinalCta() {
  const { title, lead } = content.finalCta;
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-title"
      data-surface="dark"
      className="relative isolate flex min-h-[50rem] overflow-hidden bg-accent-900 py-section text-on-dark md:min-h-[40rem] lg:min-h-[45rem]"
    >
      <Image
        src={photos.finalCta.src}
        alt={photos.finalCta.alt}
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover object-[60%_50%] max-md:top-[41%]! max-md:h-[59%]! max-md:mask-[linear-gradient(to_bottom,transparent_0%,#000_35%)] md:object-[70%_50%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(190deg,var(--color-accent-900)_30%,color-mix(in_srgb,var(--color-accent-900)_35%,transparent)_100%)] md:bg-[linear-gradient(139deg,var(--color-accent-900)_12%,color-mix(in_srgb,var(--color-accent-900)_55%,transparent)_45%,transparent_70%)]"
      />
      <div className="container-page">
        <div className="max-w-[50ch]">
          <h2 id="final-cta-title" className="max-w-[12em] text-cta lg:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-6 max-w-[36rem] text-on-dark-muted">{lead}</p>
          <div className="mt-8">
            <ButtonLink href={brand.primaryCta.href} variant="primary-light" fullWidthMobile>
              {brand.primaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
