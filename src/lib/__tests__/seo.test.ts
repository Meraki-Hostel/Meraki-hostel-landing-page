// @vitest-environment node
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap, { SITEMAP_PATHS } from "@/app/sitemap";
import { pageMetadata } from "@/lib/metadata";

describe("seo", () => {
  it("emits an absolute sitemap with every public page and no noindex pages", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toHaveLength(SITEMAP_PATHS.length);
    for (const url of urls) expect(url).toMatch(/^https?:\/\//);
    expect(urls.join(" ")).not.toMatch(/checkout|thank-you/);
  });

  it("points robots at the sitemap and blocks the API", () => {
    const result = robots();
    expect(result.sitemap).toMatch(/\/sitemap\.xml$/);
    expect(JSON.stringify(result.rules)).toContain("/api/");
  });

  it("gives every page its own canonical, social title and image", () => {
    const meta = pageMetadata({
      title: "Pricing Plans",
      description: "d",
      path: "/pricing",
    });
    expect(meta.alternates?.canonical).toBe("/pricing");
    expect(meta.openGraph?.url).toBe("/pricing");
    expect(meta.openGraph?.images).toBeDefined();
    expect(meta.robots).toBeUndefined();
  });

  it("marks noindex pages", () => {
    const meta = pageMetadata({
      title: "Checkout",
      description: "d",
      path: "/checkout",
      noindex: true,
    });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });
});
