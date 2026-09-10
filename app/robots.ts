import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-config";

// Routes that should never be crawled or indexed, full stop: API handlers,
// build internals, and every authenticated/private app surface. The
// previous version only blocked /api/, /_next/, /static/, /tmp/, and
// /admin/ — it missed /account/ (auth + signup), /publish/ (the post
// editor, which exposes draft content), /experiments/, and /wait/, all of
// which are real routes in this app and none of which should ever show up
// in search results.
const DISALLOWED_PATHS = [
    "/api/",
    "/_next/",
    "/static/",
    "/tmp/",
    "/admin/",
    "/account/",
    "/publish/",
    "/experiments/",
    "/wait/",
];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: DISALLOWED_PATHS,
                // Query-string URLs (pagination, tag filters) are no longer
                // blanket-disallowed here. Blocking them in robots.txt hides
                // them from crawlers entirely, which means Google can't see
                // the canonical/noindex signals on those pages and can end
                // up indexing a bare, description-less URL anyway if it's
                // linked from elsewhere. Those pages now carry
                // `robots: { index: false, follow: true }` plus a canonical
                // pointing at the clean URL instead — the correct way to
                // keep filtered/paginated views out of the index without
                // hiding them from crawlers.
            },
            {
                // ChatGPT scraper: allow reading published posts, keep
                // system/private folders out of reach.
                userAgent: "GPTBot",
                allow: "/",
                disallow: DISALLOWED_PATHS,
            },
            {
                // Anthropic's crawler: same policy as above.
                userAgent: "ClaudeBot",
                allow: "/",
                disallow: DISALLOWED_PATHS,
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
