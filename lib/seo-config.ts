/**
 * Single source of truth for every URL, brand string, and default used by
 * the SEO layer (metadata, JSON-LD, sitemap, robots.txt).
 *
 * Why this file exists: before this, the same values were hand-typed in
 * five different files (app/layout.tsx, app/sitemap.ts, app/page.tsx,
 * (blog)/posts/page.tsx, etc.) with inconsistent casing —
 * "https://blog.Kinetous.com" in one place, "https://blog.kinetous.com" in
 * another, "https://Kinetous.com" in a third. Domains are technically
 * case-insensitive, but inconsistent casing breaks exact-string canonical
 * matching, JSON-LD @id cross-references between schema blocks, and any
 * tooling that compares URLs as strings (Search Console, dedupe logic,
 * Open Graph scrapers). Import from here everywhere instead of retyping.
 */

// The blog itself — this Next.js app is deployed here.
export const SITE_URL = "https://blog.kinetous.com";

// The parent company site (separate deployment, referenced via sameAs /
// parentOrganization links in JSON-LD, not the URL of any page in *this* app).
export const COMPANY_URL = "https://kinetous.com";

export const SITE_NAME = "Kinetous Blog";
export const COMPANY_NAME = "Kinetous";

export const DEFAULT_TITLE =
    "Kinetous Blog — Automations for Shopify E-Commerce Businesses";
export const TITLE_TEMPLATE = "%s | Kinetous Blog";

export const DEFAULT_DESCRIPTION =
    "The engineering, experiments, systems, and lessons behind building an AI-native e-commerce business — from Kinetous.";

export const HOME_OG_TITLE =
    "Kinetous — AI Native FullStack E-Commerce Stores and AI Automations";
export const HOME_OG_DESCRIPTION =
    "From custom full-stack online stores to advanced internal tools and automated pipelines — we build high-converting systems that grow your business.";

// Square-ish mark used for schema.org Organization.logo and app icons.
// NOTE: schema.org / Google prefer a raster logo (PNG/JPG, min 112x112, ideally
// square). Swap this for a real PNG export of the mark once one exists —
// SVG works for most consumers but isn't guaranteed to render in all
// rich-result surfaces.
export const LOGO_PATH = "/logo black circle.svg";

// 1200x630 social preview card used as the default OG/Twitter image.
export const DEFAULT_OG_IMAGE_PATH = "/blog og image.png";

export const KEYWORDS = [
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
];

export const AUTHORS = [
    { name: COMPANY_NAME, url: "https://www.linkedin.com/company/Kinetous/" },
    { name: "Qamar Zia", url: "https://www.linkedin.com/in/qamar-zia-32389537b/" },
];

export const SOCIAL_LINKS = AUTHORS.map((a) => a.url);

// TODO: set to the real Search Console verification token before launch.
export const GOOGLE_SITE_VERIFICATION =
    "google-site-verification-placeholder-code";

// TODO: replace with the real business phone number before launch — schema.org
// LocalBusiness/ProfessionalService listings with placeholder telephone
// numbers can get flagged in manual reviews and hurt local-pack eligibility.
export const BUSINESS_PHONE = "+92-300-XXXXXXX";

export const BUSINESS_ADDRESS = {
    locality: "Lahore",
    region: "Punjab",
    country: "PK",
    latitude: "31.5204",
    longitude: "74.3587",
};

/** JSON-LD @id anchors, kept together so every schema block references the
 * exact same identifiers and Google can stitch the graph together. */
export const SCHEMA_IDS = {
    organization: `${COMPANY_URL}/#organization`,
    localBusiness: `${COMPANY_URL}/#localbusiness`,
    website: `${SITE_URL}/#website`,
    blog: `${SITE_URL}/#blog`,
};

export function absoluteUrl(path: string): string {
    return new URL(path, SITE_URL).toString();
}

/** Builds a right-sized Cloudinary delivery URL for use as an OG/Twitter
 * image (Cloudinary's CldImage React component only renders client-side,
 * so meta tags need a plain string URL instead). */
export function cloudinaryOgImageUrl(publicId: string): string | null {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName || !publicId) return null;
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_1200,h_630,c_fill,g_auto,f_jpg,q_auto/${publicId}`;
}
