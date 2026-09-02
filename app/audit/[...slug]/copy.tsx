"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export default function CopyRenderer({ copy }: { copy: string }) {
  return (
    <>
      <div className="prose dark:prose-invert mx-auto">
        <Collapsible>
          <CollapsibleTrigger
            render={
              <Button variant="ghost" className="w-full border-blue-600">
                Click to Toggle
                <ChevronsUpDown />
              </Button>
            }
          />
          <CollapsibleContent>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{copy}</ReactMarkdown>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}
