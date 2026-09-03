import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getReadingTime } from "@/lib/reading-time";
import type { blogTable } from "@/db/schemas/schema";
import BlogCardImage from "./blog-card-image"

type BlogCardPost = typeof blogTable.$inferSelect;

// Your Cloudinary upload button stores the full widget response as a JSON
// string in coverImage (see onSuccess in page.tsx) — pull the public_id
// back out of it. Swap this for your actual storage shape if it differs.
function coverPublicId(coverImage: string | null): string | null {
  if (!coverImage) return null;
  try {
    return JSON.parse(coverImage).public_id ?? null;
  } catch {
    return null;
  }
}

export function BlogCard({ post }: { post: BlogCardPost }) {
  const publicId = coverPublicId(post.coverImage);
  const { minutes } = getReadingTime(post.body as any);

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <Card className="overflow-hidden rounded-3xl border-border bg-muted/20 py-0 transition-colors hover:border-foreground/20">
        {publicId ? (
          <div className="relative aspect-video overflow-hidden">
          <BlogCardImage  publicId={publicId} postTitle={post.title} />
          </div>
        ) : (
          <div className="aspect-video bg-zinc-900" />
        )}

        <CardHeader className="pt-5">
          <h3 className="text-xl font-semibold leading-snug tracking-tight">{post.title}</h3>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          <p className="line-clamp-2">{post.excerpt}</p>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center gap-2 pb-5 text-xs text-muted-foreground">
          {post.publishedAt && (
            <time dateTime={new Date(post.publishedAt).toISOString()}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          )}
          <span>·</span>
          <span>{minutes} min read</span>
          <div className="ml-auto flex gap-1.5">
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}