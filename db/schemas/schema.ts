import {
  uuid,
  boolean,
  pgTable,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const blogStatus = pgEnum("blog_status", [
  "draft",
  "published",
  "scheduled",
  "archived",
]);

export const blogTable = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),

  // was boolean("visibile") — typo in the actual column name, fixed
  visible: boolean("visible").notNull().default(false),
  featured: boolean("featured").notNull().default(false),

  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),

  canonicalUrls: text("canonical_urls").array().default(sql`ARRAY[]::text[]`),

  // slug now generated from the title in addBlog(), not a random UUID default
  slug: text("slug").notNull().unique(),

  // property name now matches the actual column name (was mapped to "description")
  excerpt: text("excerpt").notNull(),

  // property name now matches the actual column name (was mapped to "image")
  coverImage: text("cover_image").notNull(),

  tags: text("tags").array().default(sql`ARRAY[]::text[]`),

  // TODO: once you have a users table, swap this for
  // authorId: uuid("author_id").references(() => usersTable.id).notNull()
  authorId: text("author").notNull(),

  status: blogStatus("status").notNull().default("draft"),

  // was mapped to the "data_published" column (copy/paste leftover), fixed
  createdAt: timestamp("created_at").notNull().defaultNow(),

  // nullable now — a draft has no publish date yet
  publishedAt: timestamp("published_at"),

  // auto-managed now, no more manually stamping this on every save
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

  body: text("body"),
});