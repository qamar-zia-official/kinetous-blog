"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CanonicalUrlListProps {
  urls: string[];
  onChange: (urls: string[]) => void;
}

export function CanonicalUrlList({ urls, onChange }: CanonicalUrlListProps) {
  const updateAt = (index: number, value: string) => {
    onChange(urls.map((url, i) => (i === index ? value : url)));
  };

  const removeAt = (index: number) => {
    onChange(urls.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2 lg:col-span-2 w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Canonical URLs</span>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 gap-1 text-xs"
          onClick={() => onChange([...urls, ""])}
        >
          <PlusIcon className="size-3" />
          Add
        </Button>
      </div>

      {urls.map((url, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            placeholder="https://example.com/original-post"
            value={url}
            onChange={(e) => updateAt(index, e.target.value)}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-8 shrink-0"
            onClick={() => removeAt(index)}
            aria-label="Remove canonical URL"
          >
            <XIcon className="size-3.5" />
          </Button>
        </div>
      ))}
    </div>
  );
}