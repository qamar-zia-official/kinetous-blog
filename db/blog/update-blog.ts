"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../index";
import { blogTable } from "../schemas/schema";
import { updateBlogSchema } from "./blog-schema";
import { ok, fail, type ActionResult } from "./result";

export async function updateBlog(
  input: typeof blogTable.$inferInsert & { id: string }
): Promise<ActionResult<typeof blogTable.$inferSelect>> {
  const parsed = updateBlogSchema.safeParse(input);

  if (!parsed.success) {
    return fail(new Error(parsed.error.issues[0]?.message ?? "Invalid blog data"));
  }

  const { id, ...rest } = parsed.data;

  try {
    // .where(eq(blogTable.id, id)) is the fix — without it this updates
    // every row in the table, which is exactly what was happening before.
    const [row] = await db
      .update(blogTable)
      .set(rest)
      .where(eq(blogTable.id as never, id))
      .returning();

    if (!row) return fail(new Error("Blog not found"));

    revalidatePath("/blog");
    revalidatePath(`/blog/${row.slug}`);
    return ok(row);
  } catch (e) {
    return fail(e);
  }
}