import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-guard";
import { getPostsByAuthor } from "@/lib/blog-queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
    // Belt-and-suspenders: middleware.ts already redirects logged-out
    // visitors before they reach this page, but middleware's check is a
    // fast cookie-presence check, not a verified session (see the comment
    // in middleware.ts). This is the real, DB-backed check, and it's what
    // actually decides what data gets fetched below.
    const user = await getCurrentUser();
    if (!user) redirect("/account/login?next=/account/dashboard");

    const posts = await getPostsByAuthor(user.id);

    return (
        <main className="mx-auto max-w-4xl px-6 py-16 space-y-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {user.name}
                    </h1>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
                <LogoutButton />
            </div>

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your posts</h2>
                <Button asChild>
                    <Link href="/publish/new">New post</Link>
                </Button>
            </div>

            {posts.length === 0 ? (
                <p className="text-muted-foreground">
                    You haven&apos;t written anything yet.
                </p>
            ) : (
                <ul className="divide-y divide-border rounded-lg border border-border">
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            className="flex items-center justify-between gap-4 p-4"
                        >
                            <div>
                                <p className="font-medium">{post.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {post.status}
                                    {post.publishedAt
                                        ? ` · ${new Date(post.publishedAt).toLocaleDateString()}`
                                        : ""}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!post.visible && (
                                    <Badge variant="secondary">Draft</Badge>
                                )}
                                <Button variant="outline" asChild>
                                    <Link href={`/publish/${post.slug}`}>Edit</Link>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
