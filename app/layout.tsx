import type { Metadata, Viewport } from "next";
import ogImage from "@/public/blog og image.png";
import "./globals.css";
import "./custom.css";
import logo from "@/public/logo black circle.svg";
import { ViewTransition } from "react";
import localFont from "next/font/local";
import BotProvider from "@/app/components/bot/bot-provider";
import { Inter } from "next/font/google";
import StructuredData from "@/components/seo/StructuredData";
import { Footer2 } from "@/components/footer2";
import Navbar from "./components/navbar/nav";
import { NavigationProvider } from "./components/navbar/nav-context-provider";

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
export const metadata: Metadata = {
    metadataBase: new URL("https://blog.kinetous.com"),
    icons: "/logo4.svg",
    title: {
        default:
            "Kinetous — Custom E-Commerce & Web Apps for Pakistani Businesses",
        template: "%s | Kinetous",
    },
    description:
        "Kinetous builds high-performance custom e-commerce stores, custom software, and AI-powered web applications for Pakistani businesses. Scale your physical or digital business with reliable systems built by engineers.",
    keywords: [
        "web developer Pakistan",
        "Next.js developer Pakistan",
        "e-commerce development Pakistan",
        "custom web app Pakistan",
        "AI web development Pakistan",
        "freelance developer Pakistan",
        "online store development Pakistan",
        "WooCommerce developer Pakistan",
        "Next.js e-commerce store",
        "custom website Pakistan",
        "software development agency Pakistan",
        "hire React developers Lahore",
        "Pakistan technology partners",
    ],
    authors: [
        {
            name: "Kinetous",
            url: "https://www.linkedin.com/company/Kinetous/",
        },
        {
            name: "Qamar Zia",
            url: "https://www.linkedin.com/in/qamar-zia-32389537b/",
        },
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Kinetous — AI Native FullStack E-Commerce Stores and AI Automations",
        description:
            "From custom full-stack online stores to advanced internal tools and automated pipelines — we build high-converting systems that grow your business.",
        url: "https://Kinetous.com",
        siteName: "Kinetous",
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
        title: "Kinetous — AI Native FullStack E-Commerce Stores and AI Automations",
        description:
            "From custom full-stack online stores to advanced internal tools and automated pipelines — we build high-converting systems that grow your business.",
        images: [ogImage.src],
    },
    verification: {
        google: "google-site-verification-placeholder-code", // Replace with your actual search console token
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Structured Organization and LocalBusiness Entity data representation (Pakistan Local SEO Focus)
    const organizationSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://Kinetous.com/#organization",
                name: "Kinetous",
                url: "https://Kinetous.com",
                logo: {
                    "@type": "ImageObject",
                    url: "https://Kinetous.com/logo.png",
                    caption: "Kinetous Emblem",
                },
                sameAs: [
                    "https://www.linkedin.com/company/Kinetous/",
                    "https://www.linkedin.com/in/qamar-zia-32389537b/",
                ],
            },
            {
                "@type": "ProfessionalService",
                "@id": "https://Kinetous.com/#localbusiness",
                parentOrganization: {
                    "@id": "https://Kinetous.com/#organization",
                },
                name: "Kinetous HQ",
                image: "https://Kinetous.com/og-main.png",
                priceRange: "$$$",
                telephone: "+92-300-XXXXXXX", // Add your contact phone number here
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lahore",
                    addressRegion: "Punjab",
                    addressCountry: "PK",
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: "31.5204",
                    longitude: "74.3587",
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
                <BotProvider>
                    <NavigationProvider>
                        <Navbar />
                        <ViewTransition>{children}</ViewTransition>
                        <Footer2
                            logo={logo}
                            copyright="Kinetous"
                            description="Kinetous - FullStack AI Native E-Commmerce Product and Automation studio"
                        ></Footer2>
                    </NavigationProvider>
                </BotProvider>
            </body>
        </html>
    );
}
