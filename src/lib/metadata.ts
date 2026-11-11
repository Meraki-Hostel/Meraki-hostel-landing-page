import type { Metadata } from "next";
import { brand } from "@/config/brand";

const IMAGE = { width: 1200, height: 630 };

type PageMetadataInput = {
  /** Page title without the brand suffix (the layout template adds " · StayPookie"). */
  title: string;
  description: string;
  /** Site-relative path, used for the canonical URL and og:url. */
  path: string;
  /** Keep the page out of search results (checkout, thank-you). */
  noindex?: boolean;
};

/**
 * One place that gives every page its own title, description, canonical URL and
 * social tags. Child `openGraph`/`twitter` replace the layout's wholesale, so they
 * must be restated here or the page would share the homepage's social title.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} · ${brand.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: "en_IN",
      title: socialTitle,
      description,
      url: path,
      // File-based images (src/app/opengraph-image.tsx) are not inherited once a page
      // defines its own openGraph, so point at the same card explicitly.
      images: [{ url: "/opengraph-image", alt: socialTitle, ...IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: "/twitter-image", alt: socialTitle, ...IMAGE }],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
