import { type Editor } from "@tiptap/react";

import { Check, ChevronDown, List, ListOrdered, ListTodo } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ListAction = {
  label: string;
  icon: React.ElementType;
  active: (editor: Editor) => boolean;
  action: (editor: Editor) => void;
};

const LIST_TYPES: ListAction[] = [
  {
    label: "Bullet List",
    icon: List,
    active: (editor) => editor.isActive("bulletList"),
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
  },

  {
    label: "Numbered List",
    icon: ListOrdered,
    active: (editor) => editor.isActive("orderedList"),
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },

  {
    label: "Task List",
    icon: ListTodo,
    active: (editor) => editor.isActive("taskList"),
    action: (editor) => editor.chain().focus().toggleTaskList().run(),
  },
];

export default function ListsDropdown({ editor }: { editor: Editor }) {
  const current =
    LIST_TYPES.find((item) => item.active(editor)) ?? LIST_TYPES[0];

  const CurrentIcon = current.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="gap-2">
            <CurrentIcon className="size-4" />
            Lists
            <ChevronDown className="size-4 opacity-60" />
          </Button>
        }
      />

      <DropdownMenuContent align="start" className="w-60">
        {LIST_TYPES.map((item) => {
          const Icon = item.icon;

          const active = item.active(editor);

          return (
            <DropdownMenuItem
              key={item.label}
              onClick={() => item.action(editor)}
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
