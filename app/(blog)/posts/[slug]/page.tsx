import { notFound } from "next/navigation";
import  BlogCardImage  from "@/components/blog/blog-card-image"
import type { Metadata } from "next";
import { getBlog } from "@/db/blog/get-blog";
import { BlogBody } from "@/components/blog/blog-body";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { extractHeadings } from "@/lib/heading-ids";
import { getReadingTime } from "@/lib/reading-time";

function coverPublicId(coverImage: string | null): string | null {
  if (!coverImage) return null;
  try {
    return JSON.parse(coverImage).public_id ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlog(slug);
  if (!result.success || !result.data) return {};

  const post = result.data;
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: post.canonicalUrls?.[0] ? { canonical: post.canonicalUrls[0] } : undefined,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      tags: post.tags ?? undefined,
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

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-24">
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