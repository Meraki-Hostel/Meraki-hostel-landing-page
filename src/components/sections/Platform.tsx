import { brand } from "@/config/brand";
import { content, sample } from "@/config/site-content";
import { ButtonLink } from "@/components/ui/Button";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { OccupancyGrid } from "@/components/preview/OccupancyGrid";
import { TenantList } from "@/components/preview/TenantList";
import { RentLedger } from "@/components/preview/RentLedger";
import { OpsList } from "@/components/preview/OpsList";
import { PlatformTabs } from "@/components/sections/PlatformTabs";

/** Inset split: preview left, dark tab panel right (ref: Clarion "One unified platform"). */
export function Platform() {
  const { title, tabs } = content.platform;
  const panels = {
    rooms: (
      <PreviewFrame screen="Rooms" summary="Sample rooms with occupied and vacant beds.">
        <OccupancyGrid rooms={sample.rooms} />
      </PreviewFrame>
    ),
    tenants: (
      <PreviewFrame screen="Tenants" summary="Sample list of tenants with their room and bed.">
        <TenantList tenants={sample.tenants} />
      </PreviewFrame>
    ),
    rent: (
      <PreviewFrame screen="Rent" summary="Sample rent records with paid, due and overdue status.">
        <RentLedger rows={sample.rent} />
      </PreviewFrame>
    ),
    operations: (
      <PreviewFrame screen="Records" summary="Sample property notes and records to follow up.">
        <OpsList items={sample.ops} />
      </PreviewFrame>
    ),
  };

  return (
    <section id="platform" aria-labelledby="platform-title" className="bg-canvas pb-section">
      <div className="container-page">
        <PlatformTabs
          title={title}
          tabs={tabs}
          panels={panels}
          cta={
            <ButtonLink href={brand.primaryCta.href} variant="primary-light" fullWidthMobile>
              {brand.primaryCta.label}
            </ButtonLink>
          }
        />
      </div>
    </section>
  );
}
