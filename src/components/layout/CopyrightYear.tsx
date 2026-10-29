import { cacheLife } from "next/cache";

/** Current year, cached so the page stays prerendered (cacheComponents is on). */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
