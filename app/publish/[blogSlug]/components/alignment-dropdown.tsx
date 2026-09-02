import { type Editor } from "@tiptap/react";

import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Alignment = {
  label: string;
  value: "left" | "center" | "right" | "justify";
  icon: React.ElementType;
};

const ALIGNMENTS: Alignment[] = [
  {
    label: "Left",
    value: "left",
    icon: AlignLeft,
  },
  {
    label: "Center",
    value: "center",
    icon: AlignCenter,
  },
  {
    label: "Right",
    value: "right",
    icon: AlignRight,
  },
  {
    label: "Justify",
    value: "justify",
    icon: AlignJustify,
  },
];

export default function AlignmentDropdown({ editor }: { editor: Editor }) {
  const current =
    ALIGNMENTS.find((item) =>
      editor.isActive({
        textAlign: item.value,
      }),
    ) ?? ALIGNMENTS[0];

  const CurrentIcon = current.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="gap-2">
            <CurrentIcon className="size-4" />
            Align
            <ChevronDown className="size-4 opacity-60" />
          </Button>
        }
      />

      <DropdownMenuContent align="start" className="w-56">
        {ALIGNMENTS.map((item) => {
          const Icon = item.icon;

          const active = editor.isActive({
            textAlign: item.value,
          });

          return (
            <DropdownMenuItem
              key={item.value}
              onClick={() =>
                editor.chain().focus().setTextAlign(item.value).run()
              }
            >
              <Icon className="mr-3 size-4" />

              <span className="flex-1">{item.label}</span>

              {active && <Check className="size-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
