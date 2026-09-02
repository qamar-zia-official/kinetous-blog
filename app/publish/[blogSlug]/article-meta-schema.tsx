import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { blogStatus, blogTable } from "@/db/schemas/schema";

/**
 * Generated straight from blogTable, so the form can't quietly drift
 * from the DB (add a notNull column there and TS will flag this file
 * for missing it). `.pick()` down to what the form actually owns —
 * id, body, and the timestamp columns are handled outside the form,
 * see to-blog-insert.ts — then `.extend()` with UI-only constraints
 * the DB itself doesn't enforce: slug shape, and the character limits
 * search engines actually truncate at.
 *
 * Requires drizzle-zod: `bun add drizzle-zod` if it's not already a
 * dependency.
 */
const baseSchema = createInsertSchema(blogTable);

export const articleMetaSchema = baseSchema
  .pick({
    title: true,
    slug: true,
    excerpt: true,
    metaTitle: true,
    metaDescription: true,
    coverImage: true,
    visible: true,
    featured: true,
    status: true,
    tags: true,
    canonicalUrls: true,
    authorId: true,
    body: true,
    createdAt: true,
    updatedAt: true,
    id: true,
    publishedAt: true,
  })
  .extend({
    title: z.string().min(1, "Title is required").max(200),
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
    excerpt: z.string().min(1, "Excerpt is required").max(300, "Keep excerpts under 300 characters"),
    metaTitle: z
      .string()
      .min(1, "Meta title is required")
      .max(70, "Titles over ~70 characters get truncated in search results"),
    metaDescription: z
      .string()
      .min(1, "Meta description is required")
      .max(160, "Descriptions over ~160 characters get truncated in search results"),
    coverImage: z.string(),
    canonicalUrls: z.array(z.string()),
    tags: z.array(z.string().min(1)),
    // Reads off blogStatus.enumValues instead of retyping the list,
    // so adding a status in the DB enum doesn't silently desync this.
    status: z.enum(blogStatus.enumValues).default("draft"),
    authorId: z.string().min(1, "Author is required"),
  });


export const articleMetaDefaults: typeof blogTable.$inferInsert = {
  title: "",
  slug: "",
  excerpt: "",
  metaTitle: "",
  metaDescription: "",
  coverImage: "",
  visible: false,
  featured: false,
  status: "draft",
  tags: [],
  canonicalUrls: [],
  // TODO(auth): replace with the real signed-in user's id once auth is
  // wired up. Solo-author placeholder for now — this is the only line
  // to change when real auth lands.
  authorId: "qamar-zia",
  body: "",
  publishedAt: new Date(),
  updatedAt: new Date(),
  createdAt: new Date(),
};
export type ArticleMetaFormValues = z.infer<typeof articleMetaSchema>;