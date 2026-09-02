"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../index";
import { blogTable } from "../schemas/schema";
import { ok, fail, type ActionResult } from "./result";

export async function removeBlog(
  blogId: string
): Promise<ActionResult<{ id: string }>> {
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