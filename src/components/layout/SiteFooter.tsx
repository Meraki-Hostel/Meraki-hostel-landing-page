import Link from "next/link";
import Image from "next/image";
import { brand, getContact } from "@/config/brand";
import { logo, mascots } from "@/config/images";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { Icon } from "@/components/ui/Icon";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { getPublicEnv } from "@/lib/env";

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
            <div className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt=""
                aria-hidden="true"
                className="h-10 w-auto"
              />
              <p className="font-heading text-h3 font-medium leading-none tracking-tight text-espresso">
                {brand.name}
              </p>
            </div>
            <p className="mt-4 max-w-[34ch] font-body text-small text-dust leading-relaxed">
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
                {getPublicEnv().gaMeasurementId ? (
                  <li>
                    <CookieSettingsButton
                      className={`${linkClass} cursor-pointer`}
                    />
                  </li>
                ) : null}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Giant wordmark: one edge-to-edge gradient-filled sign-off, breaking out
          of container-page on purpose so it spans the full viewport width.
          The three role mascots (owner/student/support — same cast as the
          homepage "Built for every role" section) fill the empty space
          around it: owner as a small crest above, student/support flanking
          either side. Decorative only, hidden from assistive tech. */}
      <div className="relative mt-12 md:mt-16">
        <div className="flex justify-center" aria-hidden="true">
          <div className="mascot-fade relative size-20 md:size-24">
            <Image
              src={mascots.owner.src}
              alt=""
              fill
              sizes="6rem"
              className="object-contain"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mascot-fade absolute left-2 top-1/2 hidden h-32 w-32 -translate-y-1/2 -rotate-6 opacity-90 lg:block xl:left-10 xl:h-40 xl:w-40"
        >
          <Image
            src={mascots.student.src}
            alt=""
            fill
            sizes="10rem"
            className="object-contain"
          />
        </div>
        <div
          aria-hidden="true"
          className="mascot-fade absolute right-2 top-1/2 hidden h-32 w-32 -translate-y-1/2 rotate-6 opacity-90 lg:block xl:right-10 xl:h-40 xl:w-40"
        >
          <Image
            src={mascots.support.src}
            alt=""
            fill
            sizes="10rem"
            className="object-contain"
          />
        </div>

        <p
          aria-hidden="true"
          className="footer-watermark font-heading font-medium tracking-tight"
        >
          {brand.name}
        </p>
      </div>

      <div className="container-page">
        {/* Bottom copyright & attribution */}
        <div className="mt-8 flex flex-col gap-3 border-t border-line/80 pt-8 font-body text-small text-dust lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CopyrightYear /> {brand.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span>Built for hostel & PG owners in India.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
