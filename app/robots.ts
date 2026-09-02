import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/blog/",
          "/services",
          "/services/*",
          "/cases",
          "/cases/*",
          "/company",
          "/about",
          "/contact",
          "/experiments",
          "/overview",
          "/pricing",
          "/team",
        ],
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
        allow: [
          "/",
          "/blog/",
          "/services",
          "/services/*",
          "/cases",
          "/cases/*",
          "/company",
          "/about",
          "/contact",
          "/experiments",
          "/overview",
          "/pricing",
          "/team",
        ],
        disallow: ["/api/", "/_next/"],
      },
      {
        // Claude / Anthropic Crawler configurations
        userAgent: "ClaudeBot",
        allow: [
          "/",
          "/blog/",
          "/services",
          "/services/*",
          "/cases",
          "/cases/*",
          "/company",
          "/about",
          "/contact",
          "/experiments",
          "/overview",
          "/pricing",
          "/team",
        ],
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://Kinetous.com/sitemap.xml",
  };
}
