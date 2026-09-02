import { type Editor } from "@tiptap/react";

import {
  ChevronDown,
  Check,
  ImageIcon,
  Table2,
  Minus,
  Code2,
  Quote,
  LocateFixed,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BsYoutube } from "react-icons/bs";
import { Fragment } from "react/jsx-runtime";
import { insertionActions } from "./command-pallete";

type InsertAction = {
  label: string;
  icon: React.ElementType;
  action: (editor: Editor) => void;
};

const tableDim = [3, 3];

export default function InsertDropdown({ editor }: { editor: Editor }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="gap-2">
            Insert
            <ChevronDown className="size-4 opacity-60" />
          </Button>
        }
      />

      <DropdownMenuContent align="start" className="w-64">
        {insertionActions.map((item) => {
          const Icon: LucideIcon | undefined = item.icon;

          return (
            <Fragment key={item.label}>
              <DropdownMenuItem
                key={item.label}
                onClick={() => item.action(editor)}
              >
              {
Icon &&  <Icon className="mr-3 size-4" />
              }
                <span className="flex-1">{item.label}</span>
              </DropdownMenuItem>
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
