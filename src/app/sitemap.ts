import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

/** Indexable pages only: /checkout and /thank-you are noindex and left out on purpose. */
export const SITEMAP_PATHS = [
  "/",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/refund-policy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
