import { type Editor } from "@tiptap/react";

import UndoRedoGroup from "./undo-redo-group";
import TextStyleDropdown from "./text-style-dropdown";
import InlineFormattingGroup from "./inline-formatting-group";
import LinkPopover from "./link-popover";
import ListsDropdown from "./lists-dropdown";
import AlignmentDropdown from "./alignment-dropdown";
import InsertDropdown from "./insert-dropdown";
import ArticleActions from "./article-actions";

import { Separator } from "@/components/ui/separator";
import ColorDropdown from "./color-dropdown";

export default function Toolbar({ editor, save, canSave, isSaving }: { editor: Editor, save: (state: "publish" | "draft") => void, canSave: boolean, isSaving: boolean }) {
  return (
    <header className="flex z-100 h-14 items-center gap-1 overflow-x-auto border-b bg-zinc/80 px-3 backdrop-blur-xl w-full rounded-full box-shadow-2xl">
      
      <UndoRedoGroup editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <TextStyleDropdown editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <InlineFormattingGroup editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <LinkPopover editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ListsDropdown editor={editor} />

      <AlignmentDropdown editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <InsertDropdown editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />
      <ColorDropdown editor={editor} />
      <Separator orientation="vertical" className="mx-1 h-6" />

      <div className="ml-auto flex items-center gap-2">
        <ArticleActions save={save} disabled={!canSave} />
      </div>
    </header>
  );
}