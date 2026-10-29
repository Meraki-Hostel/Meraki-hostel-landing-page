import type { MetadataRoute } from "next";
import { getPublicEnv } from "@/lib/env";

// Sitemaps need absolute URLs, so entries exist only once NEXT_PUBLIC_SITE_URL is set.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPublicEnv().siteUrl;
  if (!siteUrl) return [];
  return ["/", "/privacy", "/terms"].map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
