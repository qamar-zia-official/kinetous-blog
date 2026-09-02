"use client";

import { useEffect, useState } from "react";

import { type Editor } from "@tiptap/react";

import { Link2, Trash2, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function LinkPopover({ editor }: { editor: Editor }) {
  const [url, setUrl] = useState("");

  const active = editor.isActive("link");

  useEffect(() => {
    if (active) {
      setUrl(editor.getAttributes("link").href ?? "");
    } else {
      setUrl("");
    }
  }, [active, editor]);

  function applyLink() {
    const value = url.trim();

    if (!value) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const href =
      value.startsWith("http://") || value.startsWith("https://")
        ? value
        : `https://${value}`;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href,
        target: "_blank",
      })
      .run();
  }

  function removeLink() {
    editor.chain().focus().unsetLink().run();
    setUrl("");
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant={active ? "secondary" : "ghost"} size="icon">
            <Link2 className="size-4" />
          </Button>
        }
      />

      <PopoverContent align="start" className="w-96 space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Link</h4>

          <p className="text-xs text-muted-foreground">
            Paste a URL to create or edit a hyperlink.
          </p>
        </div>

        <Input
          autoFocus
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              applyLink();
            }
          }}
        />

        <div className="flex justify-between">
          <Button
            variant="destructive"
            size="sm"
            onClick={removeLink}
            disabled={!active}
          >
            <Trash2 className="mr-2 size-4" />
            Remove
          </Button>

          <div className="flex gap-2">
            {active && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(editor.getAttributes("link").href, "_blank")
                }
              >
                <ExternalLink className="mr-2 size-4" />
                Open
              </Button>
            )}

            <Button size="sm" onClick={applyLink}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
