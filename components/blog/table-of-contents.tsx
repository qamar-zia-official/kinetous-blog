"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { HeadingOutlineItem } from "@/lib/heading-ids";

export function TableOfContents({ items }: { items: HeadingOutlineItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null; // not worth a sidebar for a single heading

  const minLevel = Math.min(...items.map((i) => i.level));

  return (
    <nav aria-label="Table of contents" className="space-y-1 text-sm">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">On this page</p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          style={{ paddingLeft: (item.level - minLevel) * 12 }}
          className={cn(
            "block border-l py-1 pl-3 text-muted-foreground transition-colors hover:text-foreground",
            activeId === item.id ? "border-primary text-foreground" : "border-transparent",
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}