"use server";

import { eq } from "drizzle-orm";
import { db } from "../index";
import { blogTable } from "../schemas/schema";
import { ok, fail, type ActionResult } from "./result";

export async function getBlog(
  blogSlug: string
): Promise<ActionResult<typeof blogTable.$inferSelect | null>> {
  try {
    const [row] = await db
      .select()
      .from(blogTable)
      .where(eq(blogTable.slug, blogSlug))
      .limit(1);

    return ok(row ?? null);
  } catch (e) {
    return fail(e);
  }
}