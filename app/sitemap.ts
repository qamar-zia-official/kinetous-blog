import { MetadataRoute } from "next";
import { getAllPublishedPosts } from "@/lib/blog-queries";
import { SITE_URL } from "@/lib/seo-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Previously this file declared its own local `baseUrl = "https://blog.Kinetous.com"`
    // (capital K) — a different string than the lowercase domain used as
    // metadataBase and in every canonical tag. Now sourced from the shared
    // config so it can't drift again.
    const baseUrl = SITE_URL;

    // 1. Static structural endpoints.
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/posts`,
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // 2. Safely capture dynamic post endpoints. Tag-filtered and paginated
    // views (/posts?tag=x, /posts?page=2) are intentionally left out of the
    // sitemap: Google's guidance is to keep sitemaps to canonical,
    // clean-URL content, and those views already carry a canonical tag
    // pointing back to /posts (see posts/page.tsx generateMetadata).
    let dynamicBlogRoutes: MetadataRoute.Sitemap = [];
    try {
        const { posts } = await getAllPublishedPosts();
        dynamicBlogRoutes = posts.map((post) => ({
            url: `${baseUrl}/posts/${post.slug}`,
            // Only set lastModified when we actually have a real
            // timestamp — an omitted field is more honest than stamping
            // every URL with the sitemap's own build time, which can read
            // as "everything changed today" to crawlers.
            lastModified: post.updatedAt
                ? new Date(post.updatedAt)
                : post.publishedAt
                  ? new Date(post.publishedAt)
                  : undefined,
            changeFrequency: "weekly",
            priority: 0.6,
        }));
    } catch (error) {
        console.error(
            "Failed to populate blog posts inside site map generation pipeline:",
            error,
        );
    }

    return [...staticRoutes, ...dynamicBlogRoutes];
}
