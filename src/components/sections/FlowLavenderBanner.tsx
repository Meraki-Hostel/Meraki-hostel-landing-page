import { brand } from "@/config/brand";

export function FlowLavenderBanner() {
  return (
    <section className="bg-canvas pb-16 md:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-lilac p-8 text-center text-lilac-ink shadow-lg md:p-14">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex rounded-full bg-white/60 px-4 py-1 text-caption font-semibold tracking-wide text-purple-900 shadow-xs">
              Built for Mobility
            </span>

            <h2 className="mt-5 font-display text-h2 font-medium tracking-tight text-lilac-ink">
              Manage wherever you are
            </h2>

            <p className="mt-4 text-lead text-lilac-ink/80">
              No need to stay chained to a desktop. Check room availability,
              show vacancies to visiting parents, and log rent payments right
              from your phone browser while walking the property.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href={brand.primaryCta.href}
                className="btn btn-primary-dark rounded-full px-8 py-3.5 text-body font-medium shadow-sm transition-transform hover:scale-[1.02]"
              >
                {brand.primaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
