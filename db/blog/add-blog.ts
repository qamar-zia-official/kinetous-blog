"use server";

import { revalidatePath } from "next/cache";
import { db } from "../index";
import { blogTable } from "../schemas/schema";
import { insertBlogSchema } from "./blog-schema";
import { ok, fail, type ActionResult } from "./result";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function addBlog(
  input: typeof blogTable.$inferInsert
): Promise<ActionResult<typeof blogTable.$inferSelect>> {
  const parsed = insertBlogSchema.safeParse({
    ...input,
    slug: input.slug || slugify(input.title),
  });

  if (!parsed.success) {
    console.log(parsed.error);
    return fail(new Error(parsed.error.issues[0]?.message ?? "Invalid blog data"));
  }

  try {
    const [row] = await db.insert(blogTable).values(parsed.data).returning();
    revalidatePath("/blog");
    return ok(row);
  } catch (e) {
    return fail(e);
  }
}