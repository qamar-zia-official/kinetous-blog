CREATE TYPE "blog_status" AS ENUM('draft', 'published', 'scheduled', 'archived');--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"visible" boolean DEFAULT false NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"meta_title" text NOT NULL,
	"meta_description" text NOT NULL,
	"canonical_urls" text[] DEFAULT ARRAY[]::text[],
	"slug" text NOT NULL UNIQUE,
	"excerpt" text NOT NULL,
	"cover_image" text NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[],
	"author" text NOT NULL,
	"status" "blog_status" DEFAULT 'draft'::"blog_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"body" text
);
