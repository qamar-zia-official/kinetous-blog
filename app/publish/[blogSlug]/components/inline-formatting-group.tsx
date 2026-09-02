import { type Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code2,
  Highlighter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type FormattingAction = {
  name: string;
  shortcut: string;
  icon: React.ElementType;
  active: (editor: Editor) => boolean;
  action: (editor: Editor) => void;
};

const ACTIONS: FormattingAction[] = [
  {
    name: "Bold",
    shortcut: "Ctrl+B",
    icon: Bold,
    active: (editor) => editor.isActive("bold"),
    action: (editor) => editor.chain().focus().toggleBold().run(),
  },

  {
    name: "Italic",
    shortcut: "Ctrl+I",
    icon: Italic,
    active: (editor) => editor.isActive("italic"),
    action: (editor) => editor.chain().focus().toggleItalic().run(),
  },

  {
    name: "Underline",
    shortcut: "Ctrl+U",
    icon: Underline,
    active: (editor) => editor.isActive("underline"),
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
  },

  {
    name: "Strike",
    shortcut: "Ctrl+Shift+S",
    icon: Strikethrough,
    active: (editor) => editor.isActive("strike"),
    action: (editor) => editor.chain().focus().toggleStrike().run(),
  },

  {
    name: "Inline Code",
    shortcut: "Ctrl+E",
    icon: Code2,
    active: (editor) => editor.isActive("code"),
    action: (editor) => editor.chain().focus().toggleCode().run(),
  },

  {
    name: "Highlight",
    shortcut: "",
    icon: Highlighter,
    active: (editor) => editor.isActive("highlight"),
    action: (editor) => editor.chain().focus().toggleHighlight().run(),
  },
];

export default function InlineFormattingGroup({ editor }: { editor: Editor }) {
  return (
    <ButtonGroup>
      {ACTIONS.map((item) => {
        const Icon = item.icon;

        return (
          <Button
            key={item.name}
            size="icon"
            variant={item.active(editor) ? "secondary" : "ghost"}
            onClick={() => item.action(editor)}
          >
            <Icon className="size-4" />
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
