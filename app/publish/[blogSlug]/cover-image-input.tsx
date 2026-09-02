"use client";

import { useState, type ChangeEvent } from "react";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CoverImageInputProps {
  value: string;
  onFileSelect: (file: File | null) => void;
}

/**
 * Handles selection + local preview only. Actual upload (S3, R2,
 * Cloudflare Images, whatever you're using) is infra-specific, so
 * the parent gets the raw File and decides what to do with it —
 * upload on selection, or hold it until the article is saved.
 */
export function CoverImageInput({ value, onFileSelect }: CoverImageInputProps) {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileSelect(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const clear = () => {
    onFileSelect(null);
    setPreview(null);
  };

  if (preview) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Cover preview" className="h-32 w-full object-cover" />
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute right-2 top-2 size-7 rounded-full"
          onClick={clear}
          aria-label="Remove cover image"
        >
          <XIcon className="size-3.5" />
        </Button>
      </div>
    );
  }

  return <Input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleChange} />;
}