"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../index";
import { blogTable } from "../schemas/schema";
import { ok, fail, type ActionResult } from "./result";
import { requireOwner, AuthError } from "@/lib/auth-guard";

export async function removeBlog(
  blogId: string
): Promise<ActionResult<{ id: string }>> {
  // Same gap as updateBlog: previously anyone could delete any post by id.
  const [existing] = await db
    .select({ authorId: blogTable.authorId })
    .from(blogTable)
    .where(eq(blogTable.id, blogId))
    .limit(1);

  if (!existing) return fail(new Error("Blog not found"));

  try {
    await requireOwner(existing.authorId);
  } catch (e) {
    if (e instanceof AuthError) return fail(e);
    throw e;
  }

  try {
    const [row] = await db
      .delete(blogTable)
      .where(eq(blogTable.id, blogId))
      .returning({ id: blogTable.id });

    if (!row) return fail(new Error("Blog not found"));

    revalidatePath("/blog");
    return ok(row);
  } catch (e) {
    return fail(e);
  }
}
