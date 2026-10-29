import { content, sample } from "@/config/site-content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { OccupancyGrid } from "@/components/preview/OccupancyGrid";
import { RentLedger } from "@/components/preview/RentLedger";
import { TenantList } from "@/components/preview/TenantList";

const media = {
  occupancy: (
    <PreviewFrame screen="Rooms" summary="Sample rooms showing which beds are occupied and vacant.">
      <OccupancyGrid rooms={sample.rooms} />
    </PreviewFrame>
  ),
  rent: (
    <PreviewFrame screen="Rent" summary="Sample monthly rent records and outstanding dues.">
      <RentLedger rows={sample.rent} />
    </PreviewFrame>
  ),
  records: (
    <PreviewFrame screen="Tenants" summary="Sample tenant records with room and bed details.">
      <TenantList tenants={sample.tenants} />
    </PreviewFrame>
  ),
};

/** Alternating 5/7 rows. DOM order is always text then media; CSS order flips sides. */
export function Features() {
  const { title, lead, rows } = content.features;
  return (
    <Section id="features" labelledBy="features-title">
      <div className="container-page">
        <SectionHeader title={title} titleId="features-title" lead={lead} />
        <div className="space-y-16 lg:space-y-section">
          {rows.map((row, index) => {
            const mediaFirst = index % 2 === 1;
            return (
              <article key={row.id} aria-labelledby={`feature-${row.id}`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-gap-main">
                <div className={["lg:col-span-5", mediaFirst ? "lg:order-2 lg:col-start-8" : ""].join(" ")}>
                  <p className="text-eyebrow text-ink-muted uppercase">{row.eyebrow}</p>
                  <h3 id={`feature-${row.id}`} className="mt-3 text-h3">
                    {row.title}
                  </h3>
                  <p className="mt-3 text-ink-muted">{row.body}</p>
                  <ul className="mt-5 space-y-2">
                    {row.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.6em] size-1.5 flex-none bg-ink" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={[
                    "min-w-0 bg-canvas-tint p-[clamp(1.5rem,1rem+2vw,3rem)] lg:col-span-7",
                    mediaFirst ? "lg:order-1 lg:col-start-1" : "",
                  ].join(" ")}
                >
                  {media[row.id as keyof typeof media]}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
