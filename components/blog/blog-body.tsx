import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import type { JSONContent } from "@tiptap/react";
import { documentExtensions, editorProseClassName } from "@/lib/editor-extensions"; // adjust import path to your actual editor route
import { createSlugger } from "@/lib/heading-ids";
import { renderHighlightedCodeBlock } from "@/lib/render-code-block";
import { BlogCallout } from "./blog-callout";
import {cn} from "@/lib/utils"

export function BlogBody({ content }: { content: JSONContent }) {
  // Fresh slugger, walked in document order — this must produce the same
  // ids as extractHeadings() (used for the TOC) since both walk top-down.
  const slugger = createSlugger();

  const rendered = renderToReactElement({
    content,
    extensions: documentExtensions,
    options: {

      nodeMapping: {
        codeBlock: ({ node }: any) => {
          return (
            <pre className="">
              <code className={`language-ts`}>
                {renderHighlightedCodeBlock(node.textContent, "ts")}
              </code>
            </pre>
          );
        },

        callout: ({ node, children }: any) => (
          <BlogCallout variant={node.attrs.variant}>{children}</BlogCallout>
        ),
      },
    },

  });

  return <div className={cn("blog-content",editorProseClassName)}>{rendered}</div>;
}