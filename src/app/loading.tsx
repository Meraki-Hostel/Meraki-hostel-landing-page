/** Route-transition loading state: a quiet skeleton under the fixed header. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="container-page pt-28 pb-16 md:pt-36"
    >
      <span className="sr-only">Loading…</span>
      <div className="mx-auto max-w-3xl space-y-4" aria-hidden="true">
        <div className="h-4 w-32 rounded-tag bg-sand motion-safe:animate-pulse" />
        <div className="h-10 w-3/4 rounded-btn bg-sand motion-safe:animate-pulse" />
        <div className="h-4 w-full rounded-btn bg-sand motion-safe:animate-pulse" />
        <div className="h-4 w-5/6 rounded-btn bg-sand motion-safe:animate-pulse" />
      </div>
    </div>
  );
}
