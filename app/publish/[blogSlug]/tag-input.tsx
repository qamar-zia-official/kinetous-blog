"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({
  tags,
  onChange,
  placeholder = "Type a tag then press comma",
  className,
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const commitTag = () => {
    const tag = draft.trim();
    if (!tag || tags.includes(tag)) {
      setDraft("");
      return;
    }
    onChange([...tags, tag]);
    setDraft("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className={className}>
      <input
        className={cn("h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 outline-none")}
        placeholder={placeholder}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "," || e.key === "Enter") {
            e.preventDefault();
            commitTag();
          }
          // Backspace on an empty field pops the last tag — common
          // pattern (Gmail, Linear, etc.), cheap to support.
          if (e.key === "Backspace" && draft === "" && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
          }
        }}
        onBlur={commitTag}
        aria-label="Add a tag"
      />

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
              <span>{tag}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-5 rounded-full"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
              >
                <XIcon className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}