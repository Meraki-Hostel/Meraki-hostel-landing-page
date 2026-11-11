import { brand } from "@/config/brand";
import { getPublicEnv } from "@/lib/env";

/** Absolute site origin: NEXT_PUBLIC_SITE_URL when set, otherwise the live domain. */
export function getSiteUrl() {
  return getPublicEnv().siteUrl ?? `https://${brand.domain}`;
}

/** Absolute URL for a path on this site (used by the sitemap and robots). */
export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}
