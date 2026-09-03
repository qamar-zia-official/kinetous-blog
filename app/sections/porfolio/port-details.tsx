"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
export default function PortDetails({ details }: { details: string }) {
  return (
    <>
      <div
        className={cn(
          "prose dark:prose-invert overflow-hidden",
          "h-50 md:h-100 mask-b-from-0",
        )}
      >
        <ReactMarkdown>{details}</ReactMarkdown>
      </div>
      <Dialog>
        <DialogTrigger>
          <p className="text-blue-400 text-sm underline cursor-pointer">
            {"See more"}
          </p>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] md:min-w-200" role="dialog">
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
          </DialogHeader>
          <div className="prose dark:prose-invert max-h-[70vh] overflow-y-scroll max-w-[90vw]">
            <ReactMarkdown>{details}</ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
