import type { Editor } from "@tiptap/react";

interface EditorFooterProps {
  editor: Editor;
}

export function EditorFooter({ editor }: EditorFooterProps) {

  return (
    <footer className="flex h-11 items-center justify-between border-t border-border px-6 text-xs text-muted-foreground">
      <div className="flex items-center gap-5">
      </div>
      <span>Markdown</span>
    </footer>
  );
}