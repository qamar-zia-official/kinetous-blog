import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { blogTable } from "../schemas/schema";

// NOTE: drizzle-zod's refine syntax has changed between versions.
// If this doesn't typecheck against your installed version, drop the
// second arg and just do createInsertSchema(blogTable) — you'll lose
// the custom messages but keep the type-level validation.
export const insertBlogSchema = createInsertSchema(blogTable, {
  title: (schema) => schema.min(1, "Title is required"),
  metaTitle: (schema) => schema.min(1, "Meta title is required"),
  metaDescription: (schema) => schema.min(1, "Meta description is required"),
  slug: (schema) => schema.min(1, "Slug is required"),
  excerpt: (schema) => schema.min(1, "Excerpt is required"),
  coverImage: (schema) => schema,
  body: (schema) => schema.min(0, "Body is required"),
  tags: () => z.array(z.string()).default([]),
  canonicalUrls: () => z.array(z.string()).default([]),
});

export const updateBlogSchema = insertBlogSchema.partial().extend({
  id: z.string().uuid(),
});

export type BlogInsert = z.infer<typeof insertBlogSchema>;
export type BlogUpdate = z.infer<typeof updateBlogSchema>;