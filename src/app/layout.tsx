import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { brand } from "@/config/brand";
import { getPublicEnv } from "@/lib/env";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const siteUrl = getPublicEnv().siteUrl;

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.title}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  // No domain is known yet: canonical and metadataBase only when NEXT_PUBLIC_SITE_URL is set.
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: "en_IN",
    title: `${brand.name} — ${brand.title}`,
    description: brand.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.title}`,
    description: brand.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6efe4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <a
          href="#main"
          className="btn btn-primary fixed top-2 left-2 z-60 -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
