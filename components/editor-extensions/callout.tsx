"use client";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutVariant = "info" | "warning" | "success" | "danger";

// Shared between the editor NodeView and the public BlogCallout renderer —
// change a color here and both places update together.
export const CALLOUT_STYLES: Record<CalloutVariant, { icon: typeof Info; className: string }> = {
  info: { icon: Info, className: "border-sky-500/30 bg-sky-500/10 text-sky-200" },
  warning: { icon: AlertTriangle, className: "border-amber-500/30 bg-amber-500/10 text-amber-200" },
  success: { icon: CheckCircle2, className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" },
  danger: { icon: XCircle, className: "border-red-500/30 bg-red-500/10 text-red-200" },
};

export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      variant: {
        default: "info",
        parseHTML: (el) => el.getAttribute("data-variant") ?? "info",
        renderHTML: (attrs) => ({ "data-variant": attrs.variant }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },

  // This renderHTML is what @tiptap/static-renderer and generateHTML fall
  // back to — it's the only part that matters for the public site unless
  // you override it with a nodeMapping (see BlogBody, which does).
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-callout": "" }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutNodeView);
  },
});

function CalloutNodeView({ node, updateAttributes }: any) {
  const variant: CalloutVariant = node.attrs.variant;
  const { icon: Icon, className } = CALLOUT_STYLES[variant];

  return (
    <NodeViewWrapper className={cn("my-4 flex gap-3 rounded-2xl border p-4", className)} data-callout>
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="flex-1 space-y-2">
        <select
          value={variant}
          onChange={(e) => updateAttributes({ variant: e.target.value })}
          className="rounded-md bg-transparent text-xs uppercase tracking-wide outline-none"
          contentEditable={false}
        >
          {Object.keys(CALLOUT_STYLES).map((v) => (
            <option key={v} value={v} className="text-foreground">
              {v}
            </option>
          ))}
        </select>
        <NodeViewContent className="prose-sm" />
      </div>
    </NodeViewWrapper>
  );
}