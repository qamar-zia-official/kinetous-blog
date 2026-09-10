"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../index";
import { blogTable } from "../schemas/schema";
import { updateBlogSchema } from "./blog-schema";
import { ok, fail, type ActionResult } from "./result";
import { requireOwner, AuthError } from "@/lib/auth-guard";

export async function updateBlog(
  input: typeof blogTable.$inferInsert & { id: string }
): Promise<ActionResult<typeof blogTable.$inferSelect>> {
  const parsed = updateBlogSchema.safeParse(input);

  if (!parsed.success) {
    return fail(new Error(parsed.error.issues[0]?.message ?? "Invalid blog data"));
  }

  const { id, ...rest } = parsed.data;

  // Ownership check. Previously this action had no session check at all —
  // it would update whatever row matched `id` for *any* caller. Look the
  // post up first so we know its real authorId (never trust an authorId
  // the client might include in `rest`), then require the current session
  // user to match it.
  const [existing] = await db
    .select({ authorId: blogTable.authorId })
    .from(blogTable)
    .where(eq(blogTable.id as never, id))
    .limit(1);

  if (!existing) return fail(new Error("Blog not found"));

  try {
    await requireOwner(existing.authorId);
  } catch (e) {
    if (e instanceof AuthError) return fail(e);
    throw e;
  }

  // authorId is intentionally not spread from `rest` into the update below
  // via a re-assignment — it's excluded so a post can never be
  // re-attributed to someone else through an edit.
  const { authorId: _ignoredAuthorId, ...safeRest } = rest as typeof rest & {
    authorId?: string;
  };

  try {
    const [row] = await db
      .update(blogTable)
      .set(safeRest)
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
