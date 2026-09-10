import type { Metadata } from "next";
import { getPublishedPosts, getAllTags } from "@/lib/blog-queries";
import { BlogCard } from "@/components/blog/blog-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { BlogPagination } from "@/components/blog/blog-pagination";
import StructuredData from "@/components/seo/StructuredData";
import {
    COMPANY_NAME,
    COMPANY_URL,
    DEFAULT_DESCRIPTION,
    SCHEMA_IDS,
    SITE_NAME,
    SITE_URL,
} from "@/lib/seo-config";

type BlogIndexSearchParams = { page?: string; tag?: string };

// Previously this page had no generateMetadata at all, so /posts,
// /posts?page=2, and /posts?tag=nextjs all served the identical title,
// description, and canonical (inherited unchanged from the layout) —
// classic duplicate-content territory. Filtered/paginated views now get a
// descriptive title, a canonical pointing back at the clean /posts URL,
// and noindex,follow so they're crawlable (links to individual posts still
// get followed) without competing with /posts in search results.
export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<BlogIndexSearchParams>;
}): Promise<Metadata> {
    const { page: pageParam, tag } = await searchParams;
    const page = Number(pageParam ?? 1) || 1;
    const isFiltered = Boolean(tag) || page > 1;

    const titleParts = ["Blog"];
    if (tag) titleParts.push(`"${tag}" posts`);
    if (page > 1) titleParts.push(`Page ${page}`);

    return {
        title: isFiltered ? titleParts.join(" — ") : "Blog",
        description: DEFAULT_DESCRIPTION,
        alternates: {
            canonical: "/posts",
        },
        robots: isFiltered
            ? { index: false, follow: true }
            : { index: true, follow: true },
    };
}

export default async function BlogIndex({
    searchParams,
}: {
    searchParams: Promise<BlogIndexSearchParams>;
}) {
    const { page: pageParam, tag } = await searchParams;
    const page = Number(pageParam ?? 1) || 1;

    const [{ posts, totalPages }, tags] = await Promise.all([
        getPublishedPosts({ page, tag }),
        getAllTags(),
    ]);

    // @id/url values now come from the shared config so they line up
    // exactly with the ones in app/layout.tsx and app/page.tsx — Google
    // stitches JSON-LD blocks across pages together by matching these
    // strings, so a casing mismatch (the previous bug) silently breaks that.
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": SCHEMA_IDS.blog,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        publisher: {
            "@type": "Organization",
            "@id": SCHEMA_IDS.organization,
            name: COMPANY_NAME,
            url: COMPANY_URL,
        },
        inLanguage: "en",
        isPartOf: {
            "@type": "WebSite",
            "@id": SCHEMA_IDS.website,
            name: SITE_NAME,
            url: SITE_URL,
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/posts` },
        ],
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-24">
            <StructuredData data={blogSchema} id="ld-blog" />
            <StructuredData data={breadcrumbSchema} id="ld-breadcrumb" />
            <header className="mb-12 space-y-4">
                <h1 className="text-5xl font-bold tracking-tight">Blog</h1>
                <TagFilter tags={tags} />
            </header>

            {posts.length === 0 ? (
                <p className="text-muted-foreground">
                    {tag
                        ? `Nothing tagged "${tag}" yet.`
                        : "Nothing published yet."}
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}

            <div className="mt-12 flex justify-center">
                <BlogPagination page={page} totalPages={totalPages} />
            </div>
        </section>
    );
}
