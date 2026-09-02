import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code2,
  Highlighter,
} from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type Editor } from "@tiptap/react";

function InlineFormattingGroup({ editor }: { editor: Editor }) {
  return (
    <ToggleGroup
      value={[
        editor.isActive("bold") ? "bold" : "",
        editor.isActive("italic") ? "italic" : "",
        editor.isActive("underline") ? "underline" : "",
        editor.isActive("strike") ? "strike" : "",
        editor.isActive("code") ? "code" : "",
        editor.isActive("highlight") ? "highlight" : "",
      ].filter(Boolean)}
    >
      <ToggleGroupItem
        value="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        aria-label="Bold"
      >
        <Bold className="size-4" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Italic"
      >
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Underline"
      >
        <Underline className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="strike"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        aria-label="Strike"
      >
        <Strikethrough className="size-4" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        aria-label="Inline Code"
      >
        <Code2 className="size-4" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="highlight"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        aria-label="Highlight"
      >
        <Highlighter className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

import {
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
  Quote,
  CodeSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

function TextStyleDropdown({ editor }: { editor: Editor }) {
  function currentLabel() {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    if (editor.isActive("heading", { level: 4 })) return "Heading 4";
    if (editor.isActive("heading", { level: 5 })) return "Heading 5";
    if (editor.isActive("heading", { level: 6 })) return "Heading 6";

    if (editor.isActive("blockquote")) return "Quote";

    if (editor.isActive("codeBlock")) return "Code Block";

    return "Paragraph";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="gap-2 flex justify-center items-center">
        {currentLabel()}
        <ChevronDown className="size-4 opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuItem
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow className="mr-2 size-4" />
          Paragraph
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="mr-2 size-4" />
          Heading 1
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="mr-2 size-4" />
          Heading 2
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="mr-2 size-4" />
          Heading 3
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <Heading4 className="mr-2 size-4" />
          Heading 4
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          <Heading5 className="mr-2 size-4" />
          Heading 5
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          <Heading6 className="mr-2 size-4" />
          Heading 6
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="mr-2 size-4" />
          Quote
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <CodeSquare className="mr-2 size-4" />
          Code Block
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Check, Palette, Type } from "lucide-react";

const TEXT_COLORS = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
]
  .map((item, index) => {
    return [
      "50",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "950",
    ].map((color) => {
      return `var(--color-${item}-${color})`;
    });
  })
  .flat();

function ColorSwatch({
  color,
  active,
  onClick,
}: {
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative h-7 w-7 rounded-2xl border transition hover:scale-105"
      style={{ backgroundColor: color }}
    >
      {active && (
        <Check className="absolute inset-0 m-auto size-4 text-black drop-shadow" />
      )}
    </button>
  );
}

function ColorDropdown({ editor }: { editor: Editor }) {
  const currentColor = editor.getAttributes("textStyle").color;

  const currentHighlight = editor.getAttributes("highlight").color;

  return (
    <DropdownMenuGroup>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-center items-center gap-2">
          <Palette className="size-4" />
          Color
          <ChevronDown className="size-4 opacity-60" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-100">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Type className="size-4" />
            Text Color
          </DropdownMenuLabel>
          <div className="grid grid-cols-11 gap-2 p-2">
            {TEXT_COLORS.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                active={currentColor === color}
                onClick={() => editor.chain().focus().setColor(color).run()}
              />
            ))}
          </div>

          <DropdownMenuItem
            className="mx-2 mb-2 w-[calc(100%-1rem)] justify-start"
            onClick={() => editor.chain().focus().unsetColor().run()}
          >
            Remove Text Color
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="flex items-center gap-2">
            <Highlighter className="size-4" />
            Highlight
          </DropdownMenuLabel>

          <div className="grid grid-cols-11 gap-2 p-2">
            {TEXT_COLORS.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                active={currentHighlight === color}
                onClick={() =>
                  editor.chain().focus().setHighlight({ color }).run()
                }
              />
            ))}
          </div>

          <DropdownMenuItem
            className="mx-2 mb-2 w-[calc(100%-1rem)] justify-start"
            onClick={() => editor.chain().focus().unsetHighlight().run()}
          >
            Remove Highlight
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </DropdownMenuGroup>
  );
}

import { useState, useEffect } from "react";

import { Link2, ExternalLink, Copy, Trash2 } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

function LinkPopover({ editor }: { editor: Editor }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(editor.getAttributes("link").href ?? "");
  }, [editor]);

  const apply = () => {
    if (!url.trim()) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };

  const remove = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  };

  const copy = async () => {
    await navigator.clipboard.writeText(url);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Link2 className="size-4" />
      </PopoverTrigger>

      <PopoverContent className="w-96 space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Link</p>

          <Input
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") apply();
            }}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="default" onClick={apply}>
            Save
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(url, "_blank")}
            >
              <ExternalLink className="size-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={copy}>
              <Copy className="size-4" />
            </Button>

            <Button variant="destructive" size="icon" onClick={remove}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import { BubbleMenu } from "@tiptap/react/menus";

import { Separator } from "@/components/ui/separator";

export default function MyBubbleMenu({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor, from, to }: any) => {
        if (editor.isActive("image")) return false;
        if (editor.isActive("table")) return false;
        if (editor.isActive("codeBlock")) return false;

        return from !== to;
      }}
      options={{
        placement: "top",
        offset: 12,
      }}
    >
      <div className="flex items-center rounded-2xl border bg-background/90 p-1 px-4 gap-2 shadow-2xl backdrop-blur-xl">
        <InlineFormattingGroup editor={editor} />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <TextStyleDropdown editor={editor} />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ColorDropdown editor={editor} />

        <Separator orientation="vertical" className="mx-1 h-6" />

        <LinkPopover editor={editor} />
      </div>
    </BubbleMenu>
  );
}
