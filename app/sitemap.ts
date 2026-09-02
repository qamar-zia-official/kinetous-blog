import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/post";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://Kinetous.com";

  // 1. Static structural endpoints
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/overview`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experiments`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 2. Safely capture dynamic post endpoints
  let dynamicBlogRoutes: MetadataRoute.Sitemap = [];
  try {
    const allPosts = getAllPosts();
    dynamicBlogRoutes = allPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      // Fallback cleanly if no date metadata is stored inside the post object
      lastModified: post.metadata.date
        ? new Date(post.metadata.date)
        : new Date(),
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
