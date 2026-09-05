import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/posts/", "/posts/*"],
                disallow: [
                    "/api/",
                    "/_next/",
                    "/static/",
                    "/tmp/",
                    "/admin/",
                    "/*?*", // Prevents crawling non-canonical tracking URLs
                ],
            },
            {
                // ChatGPT scraper: Allow reading your blog/insights, keep system folders private
                userAgent: "GPTBot",
                allow: ["/", "/posts/", "/posts/*"],
                disallow: ["/api/", "/_next/"],
            },
            {
                // Claude / Anthropic Crawler configurations
                userAgent: "ClaudeBot",
                allow: ["/", "/posts/", "/posts/*"],
                disallow: ["/api/", "/_next/"],
            },
        ],
        sitemap: "https://blog.kinetous.com/sitemap.xml",
    };
}
