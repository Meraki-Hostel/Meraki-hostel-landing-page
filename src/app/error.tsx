"use client";

import { brand, getContact } from "@/config/brand";
import { Button, ButtonLink } from "@/components/ui/Button";

/** Error boundary for any route: honest message, a retry, and a way out. */
export default function ErrorPage({ reset }: { reset: () => void }) {
  const { email } = getContact();
  return (
    <div className="container-page flex min-h-[70svh] flex-col items-center justify-center pt-(--spacing-nav-offset) text-center">
      <h1 className="text-h2">Something went wrong.</h1>
      <p className="mt-4 max-w-md text-ink-muted">
        This page failed to load. Try again, or email{" "}
        <a href={`mailto:${email}`} className="text-clay-600 underline">
          {email}
        </a>{" "}
        if it keeps happening.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="primary-dark" onClick={() => reset()}>
          Try again
        </Button>
        <ButtonLink href="/" variant="outline">
          Back to {brand.name}
        </ButtonLink>
      </div>
    </div>
  );
}
