"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export function TagFilter({ tags }: { tags: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("tag");

  function setTag(tag: string | null) {
    const params = new URLSearchParams(searchParams);
    if (tag) params.set("tag", tag);
    else params.delete("tag");
    params.delete("page"); // reset pagination whenever the filter changes
    router.push(`${pathname}?${params.toString()}`);
  }

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={!active ? "default" : "secondary"}
        className="cursor-pointer rounded-full"
        onClick={() => setTag(null)}
      >
        All
      </Badge>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={active === tag ? "default" : "secondary"}
          className="cursor-pointer rounded-full"
          onClick={() => setTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}