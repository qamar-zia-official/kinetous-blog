import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION } from "@/lib/seo-config";

// This was the generic "Writing on things I'm building and learning."
// placeholder copy, which doesn't match the brand voice used everywhere
// else (Kinetous / e-commerce automation) and gave every page under this
// layout that hadn't defined its own metadata (i.e. every blog listing/tag
// view) an off-brand description in search results. Individual post pages
// still override this via their own generateMetadata.
export const metadata: Metadata = {
  title: "Blog",
  description: DEFAULT_DESCRIPTION,
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="max-w-300 m-auto">
      <div className="border-y-2 border-zinc-800 p-2 w-full">
        <Button variant="outline">
          <ArrowLeft /> Back to Blog
        </Button>
      </div>
      <div className="m-auto flex flex-col justify-center items-center">
        {children}
      </div>
    </main>
  );
}
