import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import Emoji, { gitHubEmojis } from "@tiptap/extension-emoji";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import {TableKit} from "@tiptap/extension-table"

import { all, createLowlight } from "lowlight";

import { Callout } from "@/components/editor-extensions/callout";
import { EDITOR_CHARACTER_LIMIT } from "../app/publish/[blogSlug]/constants";
import { language } from "gray-matter";
import  * as Details from "@tiptap/extension-details" 
import { BlockMath, Mathematics, BlockMathOptions, InlineMath, InlineMathOptions, MathematicsOptions, MathematicsOptionsWithEditor, createMathMigrateTransaction, mathMigrationRegex, migrateMathStrings} from "@tiptap/extension-mathematics"
import {IFrame} from "@/components/editor-extensions/iframe"

const lowlight = createLowlight(all);





export const documentExtensions = [
 BlockMath, Mathematics, InlineMath,
  StarterKit.configure({
    codeBlock: false,
  }),
  IFrame,
  Details.Details.configure({
    persist: true,
  }),
  Details.DetailsContent,
  Details.DetailsSummary,
  
    CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: "plaintext",
    enableTabIndentation: true,
    tabSize: 2,
    HTMLAttributes: {
    },
  }),

  TableKit.configure({
    table: {
      renderWrapper: true
    },
  }),

  TextStyle,
  Color,

  Highlight.configure({
    multicolor: true,
  }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  Subscript,
  Superscript,

  Typography,

  Image,

  Youtube.configure({
    nocookie: true,
  }),

  Emoji.configure({
    emojis: gitHubEmojis,
    enableEmoticons: true,
  }),

  Mathematics,
];
/**
 * Editor-only extensions.
 *
 * These provide editing UX/functionality but do not represent
 * actual content in the saved document.
 */
export const editorExtensions = [
  ...documentExtensions,

  Placeholder.configure({
    placeholder: ({ node }) =>
      node.type.name === "heading"
        ? "Untitled Article"
        : "Start writing...",
  }),

  CharacterCount.configure({
    limit: EDITOR_CHARACTER_LIMIT,
  }),

  Focus.configure({
    className: "has-focus",
    mode: "deepest",
  }),
];

export const editorProseClassName = [
  "outline-none",
  "min-h-[900px]",
  "max-w-none",

  "prose",
  "prose-lg",
  "dark:prose-invert",
  "prose-zinc",

  "prose-headings:font-bold",
  "prose-headings:tracking-tight",
  "prose-headings:scroll-mt-24",

  "prose-p:leading-8",
  "prose-li:leading-8",

  "prose-img:rounded-2xl",

  "prose-pre:border",
  "prose-pre:border-border",
  "prose-pre:rounded-2xl",

  "prose-blockquote:not-italic",
  "prose-blockquote:border-zinc-700",

  "prose-code:before:hidden",
  "prose-code:after:hidden",

  "selection:bg-primary/20",
  "focus:outline-none",
].join(" ");