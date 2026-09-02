import { ChevronDown, FileClock, Globe, Save, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ArticleActions({
  save,
  disabled = false,
}: {
  save: (state: "publish" | "draft") => void;
  disabled?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="gap-2" disabled={disabled}>
            <Globe className="size-4" />
            Publish
            <ChevronDown className="size-4 opacity-70" />
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem disabled={disabled} onClick={() => save("draft")}>
          <Save className="mr-3 size-4" />
          Save Draft
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* onClick was on the <Send> icon before, not the menu item — only
            clicking the tiny glyph triggered publish. Moved it up here. */}
        <DropdownMenuItem disabled={disabled} onClick={() => save("publish")}>
          <Send className="mr-3 size-4" />
          Publish Now
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}