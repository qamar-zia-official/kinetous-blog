import type { JSONContent } from "@tiptap/react";

export type HeadingOutlineItem = { id: string; text: string; level: number };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Deterministic id generator. Call it exactly once per heading, in document
 * order. The static renderer doesn't run addProseMirrorPlugins/onCreate, so
 * extensions like UniqueID never populate real ids on the JSON — this is the
 * workaround: derive an id purely from heading text + occurrence count. As
 * long as extractHeadings() below and BlogBody's own render pass both walk
 * the doc top-to-bottom and both start a *fresh* slugger, they land on the
 * same ids independently, which is what lets the TOC's #links actually work.
 */
export function createSlugger() {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text) || "section";
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };
}

function textOf(node: JSONContent): string {
  if (node.type === "text") return node.text ?? "";
  return (node.content ?? []).map(textOf).join("");
}

/** Walks the doc once to build the sidebar outline (id, text, level). */
export function extractHeadings(doc: JSONContent | null | undefined): HeadingOutlineItem[] {
  if (!doc) return [];
  const slugger = createSlugger();
  const items: HeadingOutlineItem[] = [];

  function walk(node: JSONContent) {
    if (node.type === "heading") {
      const text = textOf(node);
      items.push({ id: slugger(text), text, level: node.attrs?.level ?? 1 });
    }
    (node.content ?? []).forEach(walk);
  }

  walk(doc);
  return items;
}