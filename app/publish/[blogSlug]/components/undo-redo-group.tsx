import { type Editor } from "@tiptap/react";

import { Undo2, Redo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function UndoRedoGroup({ editor }: { editor: Editor }) {
  return (
    <ButtonGroup>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 className="size-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 className="size-4" />
      </Button>
    </ButtonGroup>
  );
}
