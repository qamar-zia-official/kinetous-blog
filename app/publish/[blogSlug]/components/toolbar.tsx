import { type Editor } from "@tiptap/react";

import { Toolbar as TLB } from "@base-ui/react/toolbar";
import TextStyleDropdown from "./text-style-dropdown";
import InlineFormattingGroup from "./inline-formatting-group";
import LinkPopover from "./link-popover";
import ListsDropdown from "./lists-dropdown";
import AlignmentDropdown from "./alignment-dropdown";
import InsertDropdown from "./insert-dropdown";
import ArticleActions from "./article-actions";

import { Separator } from "@/components/ui/separator";
import ColorDropdown from "./color-dropdown";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Redo2, Undo2 } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

export default function Toolbar({
    editor,
    save,
    canSave,
    isSaving,
}: {
    editor: Editor;
    save: (state: "publish" | "draft") => void;
    canSave: boolean;
    isSaving: boolean;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "/") {
                if (!editor.isFocused) {
                    editor.commands.focus();
                    return;
                }
                e.preventDefault();
                ref.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [editor]);
    return (
        <TLB.Root className="flex z-100 h-14  backdrop-brightness-200 items-center gap-1 overflow-x-auto border-b bg-zinc/80 px-3 backdrop-blur-xl w-fit rounded-full box-shadow-2xl">
            <TLB.Group>
                <ButtonGroup>
                    <TLB.Button
                        ref={ref}
                        render={<Button variant="secondary" />}
                        disabled={!editor.can().undo()}
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        <Undo2 className="size-4" />
                    </TLB.Button>
                    <TLB.Button
                        disabled={!editor.can().redo()}
                        render={<Button variant="secondary" />}
                        onClick={() => editor.chain().focus().redo().run()}
                    >
                        <Redo2 className="size-4" />
                    </TLB.Button>
                </ButtonGroup>
            </TLB.Group>
            <TLB.Separator className="bg-white w-1 border-white" />

            <TextStyleDropdown editor={editor} />

            <TLB.Separator className="bg-white w-1 border-white" />

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

            <ArticleActions save={save} disabled={!canSave} />
        </TLB.Root>
    );
}
