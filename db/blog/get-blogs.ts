"use server";

import { count } from "drizzle-orm";
import { db } from "../index";
import { blogTable } from "../schemas/schema";
import { ok, fail, type ActionResult } from "./result";

export async function getBlogs(
  page: number,
  limit: number
): Promise<
  ActionResult<{ blogs: (typeof blogTable.$inferSelect)[]; total: number }>
> {
  try {
    const [blogs, totalResult] = await Promise.all([
      db
        .select()
        .from(blogTable)
        .limit(limit)
        .offset(limit * page)
        .orderBy(blogTable.updatedAt),
      db.select({ value: count() }).from(blogTable),
    ]);

    return ok({ blogs, total: totalResult[0]?.value ?? 0 });
  } catch (e) {
    return fail(e);
  }
}