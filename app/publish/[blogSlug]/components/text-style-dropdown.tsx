import { type Editor } from "@tiptap/react";

import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow,
  Quote,
  Code2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TextStyle = {
  label: string;
  icon: React.ElementType;
  active: (editor: Editor) => boolean;
  action: (editor: Editor) => void;
};

const TEXT_STYLES: TextStyle[] = [
  {
    label: "Paragraph",
    icon: Pilcrow,
    active: (editor) => editor.isActive("paragraph"),
    action: (editor) => editor.chain().focus().setParagraph().run(),
  },

  {
    label: "Heading 1",
    icon: Heading1,
    active: (editor) => editor.isActive("heading", { level: 1 }),
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },

  {
    label: "Heading 2",
    icon: Heading2,
    active: (editor) => editor.isActive("heading", { level: 2 }),
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },

  {
    label: "Heading 3",
    icon: Heading3,
    active: (editor) => editor.isActive("heading", { level: 3 }),
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },

  {
    label: "Heading 4",
    icon: Heading4,
    active: (editor) => editor.isActive("heading", { level: 4 }),
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 4 }).run(),
  },

  {
    label: "Heading 5",
    icon: Heading5,
    active: (editor) => editor.isActive("heading", { level: 5 }),
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 5 }).run(),
  },

  {
    label: "Heading 6",
    icon: Heading6,
    active: (editor) => editor.isActive("heading", { level: 6 }),
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 6 }).run(),
  },

  {
    label: "Quote",
    icon: Quote,
    active: (editor) => editor.isActive("blockquote"),
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },

  {
    label: "Code Block",
    icon: Code2,
    active: (editor) => editor.isActive("codeBlock"),
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
];

export default function TextStyleDropdown({ editor }: { editor: Editor }) {
  const current =
    TEXT_STYLES.find((style) => style.active(editor)) ?? TEXT_STYLES[0];

  const CurrentIcon = current.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="min-w-[170px] justify-between">
            <span className="flex items-center gap-2">
              <CurrentIcon className="size-4" />
              {current.label}
            </span>

            <ChevronDown className="size-4 opacity-60" />
          </Button>
        }
      />

      <DropdownMenuContent align="start" className="w-72">
        {TEXT_STYLES.map((style) => {
          const Icon = style.icon;

          const active = style.active(editor);

          return (
            <DropdownMenuItem
              key={style.label}
              onClick={() => style.action(editor)}
            >
              <Icon className="mr-3 size-4" />

              <span className="flex-1">{style.label}</span>

              {active && <Check className="size-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
