import type { JSONContent } from "@tiptap/react";

const WORDS_PER_MINUTE = 200;

function countWords(node: JSONContent): number {
  let count = 0;
  if (node.type === "text" && node.text) {
    count += node.text.trim().split(/\s+/).filter(Boolean).length;
  }
  if (node.content) {
    for (const child of node.content) {
      count += countWords(child);
    }
  }
  return count;
}

export function getReadingTime(doc: JSONContent | null | undefined): { words: number; minutes: number } {
  if (!doc) return { words: 0, minutes: 1 };
  const words = countWords(doc);
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return { words, minutes };
}