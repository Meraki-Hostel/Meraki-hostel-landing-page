import Link from "next/link";
import { brand, getContact } from "@/config/brand";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { Icon } from "@/components/ui/Icon";

/**
 * Shared Site Footer
 * - Logo wordmark in warm serif Fraunces
 * - Company legal name from config
 * - Direct contact details (email and phone)
 * - Navigation links: Terms, Privacy, Refund Policy, FAQ, Home, Pricing, How it Works, About, Contact
 * - Copyright line
 * - Fully responsive, mobile-first
 */
export function SiteFooter() {
  const contact = getContact();
  const linkClass =
    "inline-flex min-h-11 items-center font-body text-small text-bark no-underline transition-colors duration-(--dur-ui) ease-standard hover:text-clay-600 lg:min-h-0";

  return (
    <footer
      id="contact"
      className="border-t border-line bg-sand/60 py-14 md:py-20"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-gap-main">
          {/* Brand & Contact column */}
          <div className="lg:col-span-5">
            <p className="font-heading text-[2.25rem] font-medium leading-none tracking-tight text-espresso">
              {brand.name}
            </p>
            <p className="mt-2 font-body text-small font-medium text-bark">
              {brand.companyName}
            </p>
            <p className="mt-3 max-w-[34ch] font-body text-small text-dust leading-relaxed">
              {brand.description}
            </p>

            {/* Direct Contact */}
            <div className="mt-6 rounded-card border border-line bg-cream p-4 shadow-sm max-w-sm">
              <h3 className="font-body text-caption font-semibold uppercase tracking-wider text-dust">
                Contact & Support
              </h3>
              <ul className="mt-2 space-y-2 text-small">
                {contact.email ? (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-2.5 font-body text-small text-espresso no-underline transition-colors duration-(--dur-ui) ease-standard hover:text-clay-600"
                    >
                      <span className="flex size-7 items-center justify-center rounded-btn bg-clay-100 text-clay-600">
                        <Icon name="mail" size={14} />
                      </span>
                      <span>{contact.email}</span>
                    </a>
                  </li>
                ) : null}
                {contact.phone ? (
                  <li>
                    <a
                      href={`tel:${contact.phone.replace(/[\s-]/g, "")}`}
                      className="inline-flex items-center gap-2.5 font-body text-small text-espresso no-underline transition-colors duration-(--dur-ui) ease-standard hover:text-clay-600"
                    >
                      <span className="flex size-7 items-center justify-center rounded-btn bg-clay-100 text-clay-600">
                        <Icon name="phone" size={14} />
                      </span>
                      <span>{contact.phone}</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* Navigation Columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6"
          >
            {/* Product Column */}
            <div>
              <h2 className="font-body text-small font-semibold tracking-wide text-espresso">
                Product
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/" className={linkClass}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className={linkClass}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className={linkClass}>
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={linkClass}>
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help & Support Column */}
            <div>
              <h2 className="font-body text-small font-semibold tracking-wide text-espresso">
                Support
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/#faq" className={linkClass}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={linkClass}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className={linkClass}>
                    Assisted Onboarding
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column: Terms / Privacy / Refund Policy / FAQ */}
            <div>
              <h2 className="font-body text-small font-semibold tracking-wide text-espresso">
                Legal & Policies
              </h2>
              <ul className="mt-3 space-y-2">
                {brand.footerLegal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 flex flex-col gap-3 border-t border-line/80 pt-8 font-body text-small text-dust md:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CopyrightYear /> {brand.companyName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Built for hostel & PG owners in India.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
