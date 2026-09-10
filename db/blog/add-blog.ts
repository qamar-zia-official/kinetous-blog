"use server";

import { revalidatePath } from "next/cache";
import { db } from "../index";
import { blogTable } from "../schemas/schema";
import { insertBlogSchema } from "./blog-schema";
import { ok, fail, type ActionResult } from "./result";
import { requireUser, AuthError } from "@/lib/auth-guard";

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
  let user;
  try {
    user = await requireUser();
  } catch (e) {
    if (e instanceof AuthError) return fail(e);
    throw e;
  }

  const parsed = insertBlogSchema.safeParse({
    ...input,
    // `authorId` is forced to the logged-in user's id here, overriding
    // whatever the client sent. Previously `input.authorId` (fully
    // client-controlled) was passed straight through to the insert — any
    // caller could publish a post attributed to any user id, including
    // someone else's, which would also have let them "own" and later edit
    // that post once ownership checks were added.
    authorId: user.id,
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
