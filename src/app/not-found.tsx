import { brand } from "@/config/brand";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70svh] flex-col items-center justify-center pt-(--spacing-nav-offset) text-center">
      <h1 className="text-h2">This page doesn&rsquo;t exist.</h1>
      <p className="mt-4 text-ink-muted">The link may be broken or the page may have moved.</p>
      <div className="mt-8">
        <ButtonLink href="/" variant="primary-dark">
          Back to {brand.name}
        </ButtonLink>
      </div>
    </div>
  );
}
