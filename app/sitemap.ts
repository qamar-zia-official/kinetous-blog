import { MetadataRoute } from "next";
import { getAllPublishedPosts } from "@/lib/blog-queries";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://blog.Kinetous.com";

    // 1. Static structural endpoints
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/posts`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // 2. Safely capture dynamic post endpoints
    let dynamicBlogRoutes: MetadataRoute.Sitemap = [];
    try {
        const { posts } = await getAllPublishedPosts();
        dynamicBlogRoutes = posts.map((post) => ({
            url: `${baseUrl}/posts/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : undefined,
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
