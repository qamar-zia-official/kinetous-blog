import { db } from "@/db/index"; // adjust to your actual db client export
import { blogTable } from "@/db/schemas/schema";
import { and, desc, eq, sql } from "drizzle-orm";

const PAGE_SIZE = 9;

export async function getPublishedPosts({ page = 1, tag }: { page?: number; tag?: string | null }) {
  // NOTE: this assumes `tags` is a Postgres text[] column. If it's jsonb,
  // swap the containment check for `sql`${blogTable.tags} @> ${JSON.stringify([tag])}::jsonb``.
  const where = tag
    ? and(eq(blogTable.visible, true), sql`${blogTable.tags} @> ARRAY[${tag}]::text[]`)
    : eq(blogTable.visible, true);

  const [posts, [{ count }]] = await Promise.all([
    db
      .select()
      .from(blogTable)
      .where(where)
      .orderBy(desc(blogTable.publishedAt))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db.select({ count: sql<number>`count(*)` }).from(blogTable).where(where),
  ]);

  return { posts, totalPages: Math.max(1, Math.ceil(Number(count) / PAGE_SIZE)) };
}

export async function getAllTags(): Promise<string[]> {
  const rows = await db.select({ tags: blogTable.tags }).from(blogTable).where(eq(blogTable.visible, true));
  return Array.from(new Set(rows.flatMap((r) => r.tags ?? []))).sort();
}