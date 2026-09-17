import type { Metadata, Viewport } from "next";
import ogImage from "@/public/blog og image.png";
import "./globals.css";
import "./custom.css";
import logo from "@/public/logo black circle.svg";
import { ViewTransition } from "react";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import StructuredData from "@/components/seo/StructuredData";
import { Footer2 } from "@/components/footer2";
import Navbar from "./components/navbar/nav";
import { NavigationProvider } from "./components/navbar/nav-context-provider";
import {
    AUTHORS,
    COMPANY_NAME,
    COMPANY_URL,
    DEFAULT_DESCRIPTION,
    DEFAULT_TITLE,
    GOOGLE_SITE_VERIFICATION,
    HOME_OG_DESCRIPTION,
    HOME_OG_TITLE,
    KEYWORDS,
    LOGO_PATH,
    SCHEMA_IDS,
    SITE_NAME,
    SITE_URL,
    SOCIAL_LINKS,
    BUSINESS_ADDRESS,
    BUSINESS_PHONE,
} from "@/lib/seo-config";
import { ToastProvider } from "@/components/ui/toast";
import ChatWidget from "./components/bot/bot";

// Load Satoshi Locally
const clashgrotestSans = localFont({
    src: "../public/fonts/ClashGrotesk-Variable.woff2",
    variable: "--font-clashgrotesk",
    weight: "100 900",
});

const inter = Inter({
    subsets: ["latin", "cyrillic", "latin-ext", "greek"],
    variable: "--font-inter",
    weight: "variable",
});

// 1. Viewport Config (Isolated to support Next.js 14/15 standards)
export const viewport: Viewport = {
    themeColor: "#070A12",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

// 2. Global Metadata Configuration
//
// Everything here now pulls from lib/seo-config.ts instead of being
// hand-typed. The old version had `metadataBase: new URL("https://blog.kinetous.com")`
// (lowercase) but `openGraph.url: "https://Kinetous.com"` (uppercase K, and
// a *different domain* — the parent company site, not this blog). Search
// engines and social scrapers treat those as distinct hosts, which
// undermines canonicalization and can split authority/verification between
// two "versions" of the same brand. This blog's own pages now consistently
// point at SITE_URL (blog.kinetous.com); COMPANY_URL is only used where we
// mean the actual separate company site (sameAs / parentOrganization links).
export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    icons: LOGO_PATH,
    title: {
        default: DEFAULT_TITLE,
        template: "%s | " + SITE_NAME,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: KEYWORDS,
    authors: AUTHORS,
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    // Explicit default so nothing ever inherits an accidental noindex from
    // a nested layout; individual pages (drafts, filtered/paginated blog
    // views) override this where they actually need to.
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: HOME_OG_TITLE,
        description: HOME_OG_DESCRIPTION,
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: "en_US",
        type: "website",
        images: [
            {
                url: ogImage.src,
                width: 1200,
                height: 630,
                alt: "Kinetous — High-Performance Web Development and AI Apps in Pakistan",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: HOME_OG_TITLE,
        description: HOME_OG_DESCRIPTION,
        images: [ogImage.src],
        // TODO: set to the real @handle once one exists — without it,
        // Twitter/X falls back to a generic card with no attribution.
        // site: "@kinetous",
    },
    verification: {
        google: GOOGLE_SITE_VERIFICATION, // TODO: replace with your real Search Console token
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Structured Organization and LocalBusiness entity data (Pakistan local
    // SEO focus). Previously this block hardcoded "https://Kinetous.com/..."
    // (uppercase K) for every @id and url, which is a *different string*
    // than the SITE_URL used in metadataBase/canonical above — since @id
    // values are how Google stitches separate JSON-LD blocks on different
    // pages into one graph, any casing drift here silently breaks that
    // linkage. It also pointed logo/image at "/logo.png" and "/og-main.png",
    // neither of which exists in /public. Now sourced from seo-config.ts,
    // which uses real, existing assets.
    const organizationSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": SCHEMA_IDS.organization,
                name: COMPANY_NAME,
                url: COMPANY_URL,
                logo: {
                    "@type": "ImageObject",
                    url: `${COMPANY_URL}${LOGO_PATH}`,
                    caption: `${COMPANY_NAME} Emblem`,
                },
                sameAs: SOCIAL_LINKS,
            },
            {
                "@type": "ProfessionalService",
                "@id": SCHEMA_IDS.localBusiness,
                parentOrganization: {
                    "@id": SCHEMA_IDS.organization,
                },
                name: `${COMPANY_NAME} HQ`,
                image: `${COMPANY_URL}${LOGO_PATH}`,
                priceRange: "$$$",
                telephone: BUSINESS_PHONE, // TODO: replace placeholder before launch
                address: {
                    "@type": "PostalAddress",
                    addressLocality: BUSINESS_ADDRESS.locality,
                    addressRegion: BUSINESS_ADDRESS.region,
                    addressCountry: BUSINESS_ADDRESS.country,
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: BUSINESS_ADDRESS.latitude,
                    longitude: BUSINESS_ADDRESS.longitude,
                },
            },
        ],
    };

    return (
        <html lang="en" style={{ scrollBehavior: "smooth" }}>
            <head>
                <StructuredData data={organizationSchema} />
            </head>
            <body
                className={`dark bg-zinc-950 ${clashgrotestSans.variable} ${inter.className} font-mono [font-variant-ligatures:contextual] m-auto antialiased scrollbar scrollbar-thumb-blue-500 scrollbar-track-slate-100`}
            >
                <div
                    style={{
                        background: `linear-gradient(to right,
    var(--color-slate-50), var(--color-slate-100), var(--color-slate-200), var(--color-slate-300), var(--color-slate-400), var(--color-slate-500), var(--color-slate-600), var(--color-slate-700), var(--color-slate-800), var(--color-slate-900), var(--color-slate-950),
    var(--color-gray-50), var(--color-gray-100), var(--color-gray-200), var(--color-gray-300), var(--color-gray-400), var(--color-gray-500), var(--color-gray-600), var(--color-gray-700), var(--color-gray-800), var(--color-gray-900), var(--color-gray-950),
    var(--color-zinc-50), var(--color-zinc-100), var(--color-zinc-200), var(--color-zinc-300), var(--color-zinc-400), var(--color-zinc-500), var(--color-zinc-600), var(--color-zinc-700), var(--color-zinc-800), var(--color-zinc-900), var(--color-zinc-950),
    var(--color-neutral-50), var(--color-neutral-100), var(--color-neutral-200), var(--color-neutral-300), var(--color-neutral-400), var(--color-neutral-500), var(--color-neutral-600), var(--color-neutral-700), var(--color-neutral-800), var(--color-neutral-900), var(--color-neutral-950),
    var(--color-stone-50), var(--color-stone-100), var(--color-stone-200), var(--color-stone-300), var(--color-stone-400), var(--color-stone-500), var(--color-stone-600), var(--color-stone-700), var(--color-stone-800), var(--color-stone-900), var(--color-stone-950),
    var(--color-red-50), var(--color-red-100), var(--color-red-200), var(--color-red-300), var(--color-red-400), var(--color-red-500), var(--color-red-600), var(--color-red-700), var(--color-red-800), var(--color-red-900), var(--color-red-950),
    var(--color-orange-50), var(--color-orange-100), var(--color-orange-200), var(--color-orange-300), var(--color-orange-400), var(--color-orange-500), var(--color-orange-600), var(--color-orange-700), var(--color-orange-800), var(--color-orange-900), var(--color-orange-950),
    var(--color-amber-50), var(--color-amber-100), var(--color-amber-200), var(--color-amber-300), var(--color-amber-400), var(--color-amber-500), var(--color-amber-600), var(--color-amber-700), var(--color-amber-800), var(--color-amber-900), var(--color-amber-950),
    var(--color-yellow-50), var(--color-yellow-100), var(--color-yellow-200), var(--color-yellow-300), var(--color-yellow-400), var(--color-yellow-500), var(--color-yellow-600), var(--color-yellow-700), var(--color-yellow-800), var(--color-yellow-900), var(--color-yellow-950),
    var(--color-lime-50), var(--color-lime-100), var(--color-lime-200), var(--color-lime-300), var(--color-lime-400), var(--color-lime-500), var(--color-lime-600), var(--color-lime-700), var(--color-lime-800), var(--color-lime-900), var(--color-lime-950),
    var(--color-green-50), var(--color-green-100), var(--color-green-200), var(--color-green-300), var(--color-green-400), var(--color-green-500), var(--color-green-600), var(--color-green-700), var(--color-green-800), var(--color-green-900), var(--color-green-950),
    var(--color-emerald-50), var(--color-emerald-100), var(--color-emerald-200), var(--color-emerald-300), var(--color-emerald-400), var(--color-emerald-500), var(--color-emerald-600), var(--color-emerald-700), var(--color-emerald-800), var(--color-emerald-900), var(--color-emerald-950),
    var(--color-teal-50), var(--color-teal-100), var(--color-teal-200), var(--color-teal-300), var(--color-teal-400), var(--color-teal-500), var(--color-teal-600), var(--color-teal-700), var(--color-teal-800), var(--color-teal-900), var(--color-teal-950),
    var(--color-cyan-50), var(--color-cyan-100), var(--color-cyan-200), var(--color-cyan-300), var(--color-cyan-400), var(--color-cyan-500), var(--color-cyan-600), var(--color-cyan-700), var(--color-cyan-800), var(--color-cyan-900), var(--color-cyan-950),
    var(--color-sky-50), var(--color-sky-100), var(--color-sky-200), var(--color-sky-300), var(--color-sky-400), var(--color-sky-500), var(--color-sky-600), var(--color-sky-700), var(--color-sky-800), var(--color-sky-900), var(--color-sky-950),
    var(--color-blue-50), var(--color-blue-100), var(--color-blue-200), var(--color-blue-300), var(--color-blue-400), var(--color-blue-500), var(--color-blue-600), var(--color-blue-700), var(--color-blue-800), var(--color-blue-900), var(--color-blue-950),
    var(--color-indigo-50), var(--color-indigo-100), var(--color-indigo-200), var(--color-indigo-300), var(--color-indigo-400), var(--color-indigo-500), var(--color-indigo-600), var(--color-indigo-700), var(--color-indigo-800), var(--color-indigo-900), var(--color-indigo-950),
    var(--color-violet-50), var(--color-violet-100), var(--color-violet-200), var(--color-violet-300), var(--color-violet-400), var(--color-violet-500), var(--color-violet-600), var(--color-violet-700), var(--color-violet-800), var(--color-violet-900), var(--color-violet-950),
    var(--color-purple-50), var(--color-purple-100), var(--color-purple-200), var(--color-purple-300), var(--color-purple-400), var(--color-purple-500), var(--color-purple-600), var(--color-purple-700), var(--color-purple-800), var(--color-purple-900), var(--color-purple-950),
    var(--color-fuchsia-50), var(--color-fuchsia-100), var(--color-fuchsia-200), var(--color-fuchsia-300), var(--color-fuchsia-400), var(--color-fuchsia-500), var(--color-fuchsia-600), var(--color-fuchsia-700), var(--color-fuchsia-800), var(--color-fuchsia-900), var(--color-fuchsia-950),
    var(--color-pink-50), var(--color-pink-100), var(--color-pink-200), var(--color-pink-300), var(--color-pink-400), var(--color-pink-500), var(--color-pink-600), var(--color-pink-700), var(--color-pink-800), var(--color-pink-900), var(--color-pink-950),
    var(--color-rose-50), var(--color-rose-100), var(--color-rose-200), var(--color-rose-300), var(--color-rose-400), var(--color-rose-500), var(--color-rose-600), var(--color-rose-700), var(--color-rose-800), var(--color-rose-900), var(--color-rose-950)
  )`,
                    }}
                ></div>
                <ToastProvider>
                    <NavigationProvider>
                        <Navbar />
                        <ViewTransition>{children}</ViewTransition>
                        <Footer2
                            logo={logo}
                            copyright="Kinetous"
                            description="Kinetous - FullStack AI Native E-Commmerce Product and Automation studio"
                        ></Footer2>
                    </NavigationProvider>
                    <ChatWidget />
                </ToastProvider>
            </body>
        </html>
    );
}
