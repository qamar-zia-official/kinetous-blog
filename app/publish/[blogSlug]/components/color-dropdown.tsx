import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Highlighter, Palette, Type } from "lucide-react";
import { type Editor } from "@tiptap/react";

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

export default function ColorDropdown({ editor }: { editor: Editor }) {
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
