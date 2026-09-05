import { getPublishedPosts, getAllTags } from "@/lib/blog-queries";
import { BlogCard } from "@/components/blog/blog-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { BlogPagination } from "@/components/blog/blog-pagination";
import StructuredData from "@/components/seo/StructuredData";

export default async function BlogIndex({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; tag?: string }>;
}) {
    const { page: pageParam, tag } = await searchParams;
    const page = Number(pageParam ?? 1) || 1;

    const [{ posts, totalPages }, tags] = await Promise.all([
        getPublishedPosts({ page, tag }),
        getAllTags(),
    ]);
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": "https://blog.kinetous.com/#blog",

        name: "Kinetous Blog",

        description:
            "The engineering, experiments, systems, and lessons behind building an AI-native e-commerce business.",

        url: "https://blog.kinetous.com",

        publisher: {
            "@type": "Organization",
            "@id": "https://kinetous.com/#organization",
            name: "Kinetous",
            url: "https://kinetous.com",
        },

        inLanguage: "en",

        isPartOf: {
            "@type": "WebSite",
            "@id": "https://blog.kinetous.com/#website",
            name: "Kinetous Blog",
            url: "https://blog.kinetous.com",
        },
    };
    return (
        <section className="mx-auto max-w-6xl px-6 py-24">
            <StructuredData data={blogSchema} />
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
