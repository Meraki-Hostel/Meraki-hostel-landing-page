import { brand } from "@/config/brand";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70svh] flex-col items-center justify-center pt-(--spacing-nav-offset) text-center">
      <h1 className="text-h2">This page doesn&rsquo;t exist.</h1>
      <p className="mt-4 text-ink-muted">
        The link may be broken or the page may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="primary-dark">
          Back to {brand.name}
        </ButtonLink>
        <ButtonLink href="/pricing" variant="outline">
          See Plans
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}
