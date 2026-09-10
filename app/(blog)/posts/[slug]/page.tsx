import { notFound } from "next/navigation";
import  BlogCardImage  from "@/components/blog/blog-card-image"
import type { Metadata } from "next";
import { getBlog } from "@/db/blog/get-blog";
import { BlogBody } from "@/components/blog/blog-body";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { extractHeadings } from "@/lib/heading-ids";
import { getReadingTime } from "@/lib/reading-time";
import StructuredData from "@/components/seo/StructuredData";
import {
  AUTHORS,
  COMPANY_NAME,
  SCHEMA_IDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  cloudinaryOgImageUrl,
} from "@/lib/seo-config";

function coverPublicId(coverImage: string | null): string | null {
  if (!coverImage) return null;
  try {
    return JSON.parse(coverImage).public_id ?? null;
  } catch {
    return null;
  }
}

// This previously returned only title/description/canonical/a partial
// openGraph object — no image (so shares fell back to a generic browser
// card), no twitter block, no robots handling for drafts/unpublished
// posts reachable by direct URL, and no modifiedTime/authors. All of that
// is filled in below, and the canonical now falls back to this post's own
// URL instead of silently disappearing when canonicalUrls is empty (the
// old `: undefined` meant *no* canonical tag at all on most posts).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlog(slug);
  if (!result.success || !result.data) return {};

  const post = result.data;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const canonical = post.canonicalUrls?.[0] || absoluteUrl(`/posts/${post.slug}`);

  const publicId = coverPublicId(post.coverImage);
  const ogImageUrl = publicId ? cloudinaryOgImageUrl(publicId) : null;

  // Unpublished/invisible posts are still reachable at their direct URL
  // (the page component below renders notFound() for the *user-facing*
  // 404, but generateMetadata runs first) — make sure search engines never
  // index a draft that leaked out via a shared link.
  if (!post.visible) {
    return { title, robots: { index: false, follow: false } };
  }

  return {
    title,
    description,
    alternates: { canonical },
    authors: post.authorId ? [{ name: COMPANY_NAME }] : AUTHORS,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
      tags: post.tags ?? undefined,
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getBlog(slug);
  if (!result.success || !result.data || !result.data.visible) notFound();

  const post = result.data;
  const publicId = coverPublicId(post.coverImage);
  const headings = extractHeadings(post.body as any);
  const { minutes } = getReadingTime(post.body as any);
  const postUrl = post.canonicalUrls?.[0] || absoluteUrl(`/posts/${post.slug}`);
  const ogImageUrl = publicId ? cloudinaryOgImageUrl(publicId) : null;

  // BlogPosting structured data — this page previously shipped zero JSON-LD
  // of its own (only the site-wide Organization schema from the root
  // layout reached it). For a blog, this is usually the single biggest
  // structured-data gap: it's what lets Google show author/date info and
  // article rich results, and what article-aggregating crawlers key off of.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: ogImageUrl ? [ogImageUrl] : undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    author: {
      "@type": "Organization",
      "@id": SCHEMA_IDS.organization,
      name: COMPANY_NAME,
    },
    publisher: {
      "@type": "Organization",
      "@id": SCHEMA_IDS.organization,
      name: COMPANY_NAME,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": SCHEMA_IDS.blog,
      name: SITE_NAME,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/posts` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-24">
      <StructuredData data={articleSchema} id="ld-article" />
      <StructuredData data={breadcrumbSchema} id="ld-breadcrumb" />
      <header className="mx-auto max-w-3xl space-y-6 text-center">
        <div className="flex flex-wrap justify-center gap-2">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-5xl font-bold tracking-tight">{post.title}</h1>
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="flex justify-center gap-3 text-sm text-muted-foreground">
          {post.publishedAt && (
            <time dateTime={new Date(post.publishedAt).toISOString()}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          )}
          <span>·</span>
          <span>{minutes} min read</span>
        </div>
      </header>

      {publicId && (
        <div className="relative mx-auto mt-10 aspect-video max-w-5xl overflow-hidden rounded-3xl border border-border">
        <BlogCardImage publicId={publicId} postTitle={post.title} />
        </div>
      )}

      <div className="mx-auto mt-16 max-w-5xl w-full gap-12">
        <BlogBody content={ JSON.parse(post.body || "") as any} />
      </div>
    </article>
  )}