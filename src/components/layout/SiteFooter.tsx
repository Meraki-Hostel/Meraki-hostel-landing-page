import { brand, getContact } from "@/config/brand";
import { content } from "@/config/site-content";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { Icon } from "@/components/ui/Icon";
import { photoCredits } from "@/config/images";

/** Minimal footer (specs/05 §12.3, ref: Clarion footer). Contact links render only when configured. */
export function SiteFooter() {
  const contact = getContact();
  const linkClass =
    "inline-flex min-h-11 items-center text-ink no-underline transition-colors duration-(--dur-base) ease-out-quart hover:text-ink-muted lg:min-h-0";

  return (
    <footer className="border-t border-line bg-canvas py-14 md:py-20">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-gap-main">
          <div className="lg:col-span-4">
            <p className="font-display text-[2.5rem] leading-none tracking-[-0.02em]">
              {brand.name}
            </p>
            <p className="mt-4 max-w-[30ch] text-small text-ink-muted">
              {content.footer.statement}
            </p>
            {contact.email || contact.phone ? (
              <ul className="mt-4 space-y-1 text-small">
                {contact.email ? (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className={`${linkClass} gap-2`}
                    >
                      <Icon name="mail" size={16} /> {contact.email}
                    </a>
                  </li>
                ) : null}
                {contact.phone ? (
                  <li>
                    <a
                      href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                      className={`${linkClass} gap-2`}
                    >
                      <Icon name="phone" size={16} /> {contact.phone}
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6"
          >
            {content.footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-sans text-small font-medium text-ink-muted">
                  {column.title}
                </h2>
                <ul className="mt-3 space-y-1">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Giant Flow-style brand wordmark */}
        <div className="mt-16 md:mt-24 pt-12 border-t border-line/60">
          <div className="flex items-center gap-4 text-[4rem] sm:text-[6rem] md:text-[8rem] font-display font-bold tracking-tight text-ink select-none leading-none">
            <span
              className="flex items-center gap-2 sm:gap-3"
              aria-hidden="true"
            >
              <span className="size-3 sm:size-4 md:size-5 rounded-full bg-ink" />
              <span className="size-3 sm:size-4 md:size-5 rounded-full bg-ink" />
              <span className="size-3 sm:size-4 md:size-5 rounded-full bg-ink" />
              <span className="size-3 sm:size-4 md:size-5 rounded-full bg-ink" />
            </span>
            <span>{brand.name}</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 text-small text-ink-muted md:mt-16 lg:flex-row lg:justify-between">
          <p>
            © <CopyrightYear /> {brand.name}. All rights reserved.
          </p>
          <p>
            Stock photos from Unsplash by{" "}
            {photoCredits.map((credit, index) => (
              <span key={credit.name}>
                <a
                  href={credit.url}
                  className="underline transition-colors duration-(--dur-base) hover:text-ink"
                  rel="noopener"
                >
                  {credit.name}
                </a>
                {index < photoCredits.length - 2
                  ? ", "
                  : index === photoCredits.length - 2
                    ? " and "
                    : "."}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
