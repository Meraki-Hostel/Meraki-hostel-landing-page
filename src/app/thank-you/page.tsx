import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata = pageMetadata({
  title: "Thank you",
  description: "Thanks for contacting us. We reply within 24 hours.",
  path: "/thank-you",
  noindex: true,
});

/**
 * Landing page after the contact form is delivered. It deliberately says
 * nothing about payment: a payment is confirmed only inside /checkout, after
 * Razorpay confirms it, never from a URL anyone could open.
 */
export default function ThankYouPage() {
  return (
    <div className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container-page max-w-2xl mx-auto">
        <div className="card p-8 md:p-12 bg-cream text-center shadow-card border-line">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-moss/10 text-moss">
            <Icon name="check" size={28} />
          </div>
          <h1 className="mt-6 font-heading text-h2 font-medium tracking-tight text-espresso">
            Thanks, your message is with our team.
          </h1>
          <p className="mt-4 font-body text-lead text-bark leading-relaxed">
            We&rsquo;ll reply using the email or number you gave us within 24
            hours. In the meantime you can look at how {brand.name} works or
            compare plans.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/pricing" variant="primary" size="lg">
              See Plans
            </ButtonLink>
            <ButtonLink href="/" variant="outline" size="lg">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
