"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandEmpty,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Editor } from "@tiptap/react";
import { gitHubEmojis } from "@tiptap/extension-emoji";

import {
  Type,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  ListTree,
  CheckSquare,
  Quote,
  Code,
  Code2,
  Sigma,
  Minus,
  Table as TableIcon,
  PlusSquare,
  MinusSquare,
  Rows,
  Columns,
  Merge,
  Split,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  CornerDownLeft,
  LucideIcon,
  VideoIcon,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Palette,
  Baseline,
  Save,
  Send,
  Eye,
  Link2,
  Unlink,
  FilePlus2,
  LayoutGrid,
  Info,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronsUpDown,
  Clock,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  IndentIncrease,
  IndentDecrease,
  Undo2,
  Redo2,
  Eraser,
  AtSign,
  Smile,
  MousePointerSquareDashedIcon,
  Ban,
  TextCursorInput,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** An action that only needs the editor instance — formatting, insertion, etc. */
type EditorAction = {
  id: string;
  label: string;
  keywords?: string[];
  icon?: LucideIcon;
  /** Rendered instead of `icon` when set — used for color/highlight swatches. */
  swatch?: string;
  shortcut?: string;
  action: (editor: Editor) => void;
};

/** Context available to app-level actions — save/publish, navigation, the current slug. */
export type PaletteContext = {
  editor: Editor;
  router: ReturnType<typeof useRouter>;
  save?: (state: "publish" | "draft") => void;
  canSave?: boolean;
  isSaving?: boolean;
  slug?: string | null;
};

/** An action that reaches outside the editor — saving, publishing, navigating. */
type AppAction = {
  id: string;
  label: string;
  keywords?: string[];
  icon: LucideIcon;
  shortcut?: string;
  disabled?: (ctx: PaletteContext) => boolean;
  run: (ctx: PaletteContext) => void;
};

type CommandGroupKey =
  | "app"
  | "turnInto"
  | "format"
  | "align"
  | "color"
  | "highlight"
  | "insert"
  | "table"
  | "history"
  | "emoji";

// ---------------------------------------------------------------------------
// Tailwind color auto-generation
//
// Rather than hand-picking two shades per color, we seed a single base hex
// per Tailwind hue (the ~500 shade) and *derive* both a vivid "text color"
// tone and a soft "highlight" tint from it by walking the HSL lightness
// axis. This keeps the palette trivially extensible — add a hue to
// TAILWIND_HUES and both the Color and Highlight groups pick it up.
// ---------------------------------------------------------------------------

const TAILWIND_HUES: Record<string, string> = {
  slate: "#64748b",
  gray: "#6b7280",
  zinc: "#71717a",
  neutral: "#737373",
  stone: "#78716c",
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  yellow: "#eab308",
  lime: "#84cc16",
  green: "#22c55e",
  emerald: "#10b981",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  sky: "#0ea5e9",
  blue: "#3b82f6",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  purple: "#a855f7",
  fuchsia: "#d946ef",
  pink: "#ec4899",
  rose: "#f43f5e",
};

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Re-lightens a base hue to an arbitrary lightness, keeping hue/saturation. */
function withLightness(hex: string, lightness: number): string {
  const [h, s] = hexToHsl(hex);
  return hslToHex(h, s, lightness);
}

type GeneratedColor = { name: string; label: string; hex: string };

/** Vivid, ~600-weight tones — good contrast for text color. */
const TEXT_COLORS: GeneratedColor[] = Object.entries(TAILWIND_HUES).map(([name, base]) => ({
  name,
  label: name[0].toUpperCase() + name.slice(1),
  hex: withLightness(base, 0.42),
}));

/** Soft, ~200-weight tints — legible as a background highlight. */
const HIGHLIGHT_COLORS: GeneratedColor[] = Object.entries(TAILWIND_HUES).map(([name, base]) => ({
  name,
  label: name[0].toUpperCase() + name.slice(1),
  hex: withLightness(base, 0.85),
}));

function ColorSwatch({ hex, ring }: { hex: string; ring?: boolean }) {
  return (
    <span
      className="h-4 w-4 shrink-0 rounded-full border border-black/10"
      style={{ backgroundColor: hex, boxShadow: ring ? `0 0 0 2px ${hex}33` : undefined }}
      aria-hidden
    />
  );
}

// ---------------------------------------------------------------------------
// Turn Into — changes the current block's type
// ---------------------------------------------------------------------------

export const turnIntoActions: EditorAction[] = [
  { id: "paragraph", label: "Paragraph", keywords: ["p", "text", "normal", "body"], icon: Pilcrow, action: (e) => e.chain().focus().setParagraph().run() },
  { id: "h1", label: "Heading 1", keywords: ["h1", "title", "large"], icon: Heading1, shortcut: "Ctrl+Alt+1", action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run() },
  { id: "h2", label: "Heading 2", keywords: ["h2", "subtitle", "medium"], icon: Heading2, shortcut: "Ctrl+Alt+2", action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run() },
  { id: "h3", label: "Heading 3", keywords: ["h3", "small"], icon: Heading3, shortcut: "Ctrl+Alt+3", action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run() },
  { id: "h4", label: "Heading 4", keywords: ["h4"], icon: Heading4, shortcut: "Ctrl+Alt+4", action: (e) => e.chain().focus().toggleHeading({ level: 4 }).run() },
  { id: "h5", label: "Heading 5", keywords: ["h5"], icon: Heading5, shortcut: "Ctrl+Alt+5", action: (e) => e.chain().focus().toggleHeading({ level: 5 }).run() },
  { id: "h6", label: "Heading 6", keywords: ["h6"], icon: Heading6, shortcut: "Ctrl+Alt+6", action: (e) => e.chain().focus().toggleHeading({ level: 6 }).run() },
  { id: "bullet-list", label: "Bullet List", keywords: ["ul", "list", "bullet", "points"], icon: List, shortcut: "Ctrl+Shift+8", action: (e) => e.chain().focus().toggleBulletList().run() },
  { id: "ordered-list", label: "Numbered List", keywords: ["ol", "list", "ordered", "numbers"], icon: ListOrdered, shortcut: "Ctrl+Shift+7", action: (e) => e.chain().focus().toggleOrderedList().run() },
  { id: "task-list", label: "Task List", keywords: ["todo", "check", "checkbox", "task"], icon: CheckSquare, shortcut: "Ctrl+Shift+9", action: (e) => e.chain().focus().toggleTaskList().run() },
  { id: "quote", label: "Quote", keywords: ["blockquote", "citation"], icon: Quote, shortcut: "Ctrl+Shift+B", action: (e) => e.chain().focus().toggleBlockquote().run() },
  { id: "codeblock", label: "Code Block", keywords: ["code", "pre", "snippet"], icon: Code, shortcut: "Ctrl+Alt+C", action: (e) => e.chain().focus().toggleCodeBlock().run() },
  {
    id: "accordion",
    label: "Accordion",
    keywords: ["details", "accordion", "toggle", "collapsible", "dropdown"],
    icon: ChevronsUpDown,
    // Requires Details/DetailsSummary/DetailsContent from @tiptap/extension-details
    // registered in editorExtensions. Adjust the command name if your installed
    // version differs.
    action: (e) => (e.chain().focus() as any).setDetails().run(),
  },
];

// ---------------------------------------------------------------------------
// Format — toggles a mark on the current selection
// ---------------------------------------------------------------------------

export const formatActions: EditorAction[] = [
  { id: "bold", label: "Bold", shortcut: "Ctrl+B", icon: Bold, action: (e) => e.chain().focus().toggleBold().run() },
  { id: "italic", label: "Italic", shortcut: "Ctrl+I", icon: Italic, action: (e) => e.chain().focus().toggleItalic().run() },
  { id: "underline", label: "Underline", shortcut: "Ctrl+U", icon: UnderlineIcon, action: (e) => e.chain().focus().toggleUnderline().run() },
  { id: "strike", label: "Strikethrough", keywords: ["strike"], shortcut: "Ctrl+Shift+X", icon: Strikethrough, action: (e) => e.chain().focus().toggleStrike().run() },
  { id: "inline-code", label: "Inline Code", keywords: ["code"], shortcut: "Ctrl+E", icon: Code2, action: (e) => e.chain().focus().toggleCode().run() },
  { id: "highlight-default", label: "Highlight", keywords: ["highlight", "mark"], shortcut: "Ctrl+Shift+H", icon: Highlighter, action: (e) => e.chain().focus().toggleHighlight().run() },
  { id: "subscript", label: "Subscript", keywords: ["sub"], shortcut: "Ctrl+,", icon: Subscript, action: (e) => e.chain().focus().toggleSubscript().run() },
  { id: "superscript", label: "Superscript", keywords: ["sup"], shortcut: "Ctrl+.", icon: Superscript, action: (e) => e.chain().focus().toggleSuperscript().run() },
  {
    id: "link",
    label: "Add / Edit Link",
    keywords: ["link", "url", "anchor", "hyperlink"],
    shortcut: "Ctrl+K",
    icon: Link2,
    action: (e) => {
      const previous = e.getAttributes("link").href as string | undefined;
      const url = window.prompt("Enter URL", previous ?? "https://");
      if (url === null) return;
      if (url === "") {
        e.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      e.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    },
  },
  { id: "unlink", label: "Remove Link", keywords: ["link", "unlink", "remove"], icon: Unlink, action: (e) => e.chain().focus().unsetLink().run() },
  { id: "clear-formatting", label: "Clear Formatting", keywords: ["clear", "reset", "plain", "eraser"], shortcut: "Ctrl+\\", icon: Eraser, action: (e) => e.chain().focus().unsetAllMarks().clearNodes().run() },
];

// ---------------------------------------------------------------------------
// Align — paragraph/block alignment (requires @tiptap/extension-text-align)
// ---------------------------------------------------------------------------

export const alignActions: EditorAction[] = [
  { id: "align-left", label: "Align Left", keywords: ["align", "left"], shortcut: "Ctrl+Shift+L", icon: AlignLeft, action: (e) => (e.chain().focus() as any).setTextAlign("left").run() },
  { id: "align-center", label: "Align Center", keywords: ["align", "center"], shortcut: "Ctrl+Shift+E", icon: AlignCenter, action: (e) => (e.chain().focus() as any).setTextAlign("center").run() },
  { id: "align-right", label: "Align Right", keywords: ["align", "right"], shortcut: "Ctrl+Shift+R", icon: AlignRight, action: (e) => (e.chain().focus() as any).setTextAlign("right").run() },
  { id: "align-justify", label: "Justify", keywords: ["align", "justify"], shortcut: "Ctrl+Shift+J", icon: AlignJustify, action: (e) => (e.chain().focus() as any).setTextAlign("justify").run() },
  { id: "indent", label: "Indent List Item", keywords: ["indent", "nest", "tab"], icon: IndentIncrease, action: (e) => e.chain().focus().sinkListItem("listItem").run() },
  { id: "outdent", label: "Outdent List Item", keywords: ["outdent", "unnest", "shift tab"], icon: IndentDecrease, action: (e) => e.chain().focus().liftListItem("listItem").run() },
];

// ---------------------------------------------------------------------------
// Color / Highlight — generated from TAILWIND_HUES above
// (requires @tiptap/extension-text-style + @tiptap/extension-color, and
// Highlight configured with `multicolor: true`)
// ---------------------------------------------------------------------------

export const colorActions: EditorAction[] = [
  { id: "color-unset", label: "Default Text Color", keywords: ["color", "reset", "clear"], icon: Baseline, action: (e) => (e.chain().focus() as any).unsetColor().run() },
  ...TEXT_COLORS.map<EditorAction>((c) => ({
    id: `color-${c.name}`,
    label: `${c.label} Text`,
    keywords: ["color", "text", c.name],
    swatch: c.hex,
    action: (e) => (e.chain().focus() as any).setColor(c.hex).run(),
  })),
];

export const highlightActions: EditorAction[] = [
  { id: "highlight-unset", label: "Remove Highlight", keywords: ["highlight", "reset", "clear"], icon: Ban, action: (e) => e.chain().focus().unsetHighlight().run() },
  ...HIGHLIGHT_COLORS.map<EditorAction>((c) => ({
    id: `highlight-${c.name}`,
    label: `${c.label} Highlight`,
    keywords: ["highlight", "mark", "background", c.name],
    swatch: c.hex,
    action: (e) => e.chain().focus().toggleHighlight({ color: c.hex }).run(),
  })),
];

// ---------------------------------------------------------------------------
// Insert — adds new content at the cursor
// ---------------------------------------------------------------------------

export const insertionActions: EditorAction[] = [
  { id: "math-block", label: "Math Block", keywords: ["math", "latex", "formula", "equation", "katex"], icon: Sigma, action: (e) => e.chain().focus().insertContent("$$\n\n$$").run() },
  { id: "math-inline", label: "Math Inline", keywords: ["math", "latex", "formula", "equation", "katex"], icon: Sigma, action: (e) => {
    const exp = window.prompt("Enter LaTeX expression");
    return e.chain().focus().insertBlockMath({latex: exp || ""}).run()}},

  { id: "table", label: "Insert Table", keywords: ["table", "grid", "spreadsheet", "cols", "rows"], icon: TableIcon, action: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  {
    id: "image",
    label: "Image",
    keywords: ["image", "photo", "picture", "upload", "img"],
    icon: ImageIcon,
    action: (e) => {
      const url = window.prompt("Enter Image URL");
      if (url) e.chain().focus().setImage({ src: url }).run();
    },
  },
  {
    id: "youtube",
    label: "YouTube",
    keywords: ["video", "youtube", "embed", "vimeo"],
    icon: VideoIcon,
    action: (e) => {
      const url = window.prompt("Enter YouTube URL");
      if (url) e.chain().focus().setYoutubeVideo({ src: url }).run();
    },
  },
  {
    id: "iframe",
    label: "Iframe / Embed",
    keywords: ["iframe", "embed", "external", "widget"],
    icon: ExternalLink,
    action: (e) => {
      // TODO: this inserts a raw <iframe> string directly into the document —
      // unlike Image/YouTube it isn't schema-validated, and it'll render as-is
      // on the public site. Worth locking to an allowlisted domain (or a proper
      // custom node) before this ships, same idea as the Callout node.
      const url = window.prompt("Enter Embed URL");
      if (url) e.chain().focus().insertContent(`<iframe src="${url}"></iframe>`).run();
    },
  },
  {
    id: "mention",
    label: "Mention Someone",
    keywords: ["mention", "@", "user", "tag"],
    icon: AtSign,
    // Requires @tiptap/extension-mention. Inserting "@" opens its suggestion
    // popup the same way typing it manually would.
    action: (e) => e.chain().focus().insertContent("@").run(),
  },
  {
    id: "emoji-trigger",
    label: "Emoji Picker",
    keywords: ["emoji", ":", "smiley", "reaction"],
    icon: Smile,
    action: (e) => e.chain().focus().insertContent(":").run(),
  },
  {
    id: "toc",
    label: "Table of Contents",
    keywords: ["toc", "outline", "contents", "index"],
    icon: ListTree,
    // Requires @tiptap/extension-table-of-contents registered as a node/extension.
    action: (e) => (e.chain().focus() as any).insertTableOfContents?.().run?.(),
  },

  { id: "hr", label: "Horizontal Rule", keywords: ["hr", "divider", "line", "separator"], icon: Minus, action: (e) => e.chain().focus().setHorizontalRule().run() },
  { id: "hardbreak", label: "Hard Break", keywords: ["br", "line", "break", "wrap"], shortcut: "Shift+Enter", icon: CornerDownLeft, action: (e) => e.chain().focus().setHardBreak().run() },
];

// ---------------------------------------------------------------------------
// Table — structural edits, only meaningful with the cursor inside a table
// ---------------------------------------------------------------------------

export const tableActions: EditorAction[] = [
  { id: "col-before", label: "Add Column Before", keywords: ["table", "column", "insert"], icon: PlusSquare, action: (e) => e.chain().focus().addColumnBefore().run() },
  { id: "col-after", label: "Add Column After", keywords: ["table", "column", "insert"], icon: PlusSquare, action: (e) => e.chain().focus().addColumnAfter().run() },
  { id: "col-del", label: "Delete Column", keywords: ["table", "column", "remove"], icon: MinusSquare, action: (e) => e.chain().focus().deleteColumn().run() },
  { id: "row-before", label: "Add Row Before", keywords: ["table", "row", "insert"], icon: PlusSquare, action: (e) => e.chain().focus().addRowBefore().run() },
  { id: "row-after", label: "Add Row After", keywords: ["table", "row", "insert"], icon: PlusSquare, action: (e) => e.chain().focus().addRowAfter().run() },
  { id: "row-del", label: "Delete Row", keywords: ["table", "row", "remove"], icon: MinusSquare, action: (e) => e.chain().focus().deleteRow().run() },
  { id: "merge-cells", label: "Merge Cells", keywords: ["table", "merge", "combine"], icon: Merge, action: (e) => e.chain().focus().mergeCells().run() },
  { id: "split-cell", label: "Split Cell", keywords: ["table", "split", "divide"], icon: Split, action: (e) => e.chain().focus().splitCell().run() },
  { id: "toggle-header-row", label: "Toggle Header Row", keywords: ["table", "header", "row"], icon: Rows, action: (e) => e.chain().focus().toggleHeaderRow().run() },
  { id: "toggle-header-col", label: "Toggle Header Column", keywords: ["table", "header", "column"], icon: Columns, action: (e) => e.chain().focus().toggleHeaderColumn().run() },
  { id: "toggle-header-cell", label: "Toggle Header Cell", keywords: ["table", "header", "cell"], icon: TableIcon, action: (e) => e.chain().focus().toggleHeaderCell().run() },
  { id: "next-cell", label: "Go To Next Cell", keywords: ["table", "next", "tab"], icon: TextCursorInput, action: (e) => e.chain().focus().goToNextCell().run() },
  { id: "prev-cell", label: "Go To Previous Cell", keywords: ["table", "previous", "shift tab"], icon: TextCursorInput, action: (e) => e.chain().focus().goToPreviousCell().run() },
  { id: "fix-tables", label: "Fix Malformed Table", keywords: ["table", "fix", "repair"], icon: TableIcon, action: (e) => e.chain().focus().fixTables().run() },
  { id: "delete-table", label: "Delete Table", keywords: ["table", "delete", "remove"], icon: Trash2, action: (e) => e.chain().focus().deleteTable().run() },
];

// ---------------------------------------------------------------------------
// History / Selection
// ---------------------------------------------------------------------------

export const historyActions: EditorAction[] = [
  { id: "undo", label: "Undo", shortcut: "Ctrl+Z", icon: Undo2, action: (e) => e.chain().focus().undo().run() },
  { id: "redo", label: "Redo", shortcut: "Ctrl+Shift+Z", icon: Redo2, action: (e) => e.chain().focus().redo().run() },
  { id: "select-all", label: "Select All", keywords: ["select", "all"], shortcut: "Ctrl+A", icon: MousePointerSquareDashedIcon, action: (e) => e.chain().focus().selectAll().run() },
];

// ---------------------------------------------------------------------------
// App — reaches outside the editor: saving, publishing, navigation
// ---------------------------------------------------------------------------

export const appActions: AppAction[] = [
  {
    id: "save-draft",
    label: "Save Draft",
    keywords: ["save"],
    icon: Save,
    shortcut: "Ctrl+S",
    disabled: (ctx) => !ctx.save || !!ctx.isSaving,
    run: (ctx) => ctx.save?.("draft"),
  },
  {
    id: "publish",
    label: "Publish Now",
    keywords: ["publish", "live", "ship"],
    icon: Send,
    shortcut: "Ctrl+Enter",
    disabled: (ctx) => !ctx.save || !ctx.canSave || !!ctx.isSaving,
    run: (ctx) => ctx.save?.("publish"),
  },
  {
    id: "copy-link",
    label: "Copy Public Link",
    keywords: ["copy", "url", "share", "link"],
    icon: Link2,
    disabled: (ctx) => !ctx.slug,
    run: (ctx) => {
      if (ctx.slug) navigator.clipboard.writeText(`${window.location.origin}/blog/${ctx.slug}`);
    },
  },
  {
    id: "preview",
    label: "View Published Post",
    keywords: ["preview", "open", "view", "live"],
    icon: Eye,
    disabled: (ctx) => !ctx.slug,
    run: (ctx) => {
      if (ctx.slug) window.open(`/blog/${ctx.slug}`, "_blank");
    },
  },
  {
    id: "new-post",
    label: "New Post",
    keywords: ["new", "create", "draft"],
    icon: FilePlus2,
    run: (ctx) => ctx.router.push("/publish/new"), // adjust to your actual "new post" route
  },
  {
    id: "all-posts",
    label: "All Posts",
    keywords: ["catalogue", "list", "blog", "home"],
    icon: LayoutGrid,
    run: (ctx) => ctx.router.push("/blog"),
  },
];

// ---------------------------------------------------------------------------
// Recents — last few commands run, kept per-browser so returning to the
// editor tomorrow still shows what you actually use.
// ---------------------------------------------------------------------------

type RecentEntry = { group: Exclude<CommandGroupKey, "emoji">; id: string; label: string };

const RECENTS_KEY = "editor-command-palette-recents";
const MAX_RECENTS = 5;

function readRecents(): RecentEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(RECENTS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function pushRecent(entry: RecentEntry) {
  const existing = readRecents().filter((r) => !(r.group === entry.group && r.id === entry.id));
  const next = [entry, ...existing].slice(0, MAX_RECENTS);
  window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function matches(query: string, label: string, keywords: string[] = []) {
  const q = query.toLowerCase();
  if (!q) return true;
  return label.toLowerCase().includes(q) || keywords.some((k) => k.toLowerCase().includes(q));
}

const GROUP_LABELS: Record<Exclude<CommandGroupKey, "app" | "emoji">, string> = {
  turnInto: "Turn Into",
  format: "Format",
  align: "Align & Indent",
  color: "Text Color",
  highlight: "Highlight",
  insert: "Insert",
  table: "Table",
  history: "History & Selection",
};

export default function CommandPallete({
  editor,
  open,
  setOpen,
  save,
  canSave,
  isSaving,
  slug,
}: {
  editor: Editor;
  open: boolean;
  setOpen: (open: boolean) => void;
  save?: (state: "publish" | "draft") => void;
  canSave?: boolean;
  isSaving?: boolean;
  slug?: string | null;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recents, setRecents] = useState<RecentEntry[]>([]);

  useEffect(() => {
    if (open) setRecents(readRecents());
  }, [open]);

  const ctx: PaletteContext = { editor, router, save, canSave, isSaving, slug };

  const filtered = useMemo(() => {
    return {
      app: appActions.filter((a) => matches(query, a.label, a.keywords)),
      turnInto: turnIntoActions.filter((a) => matches(query, a.label, a.keywords)).slice(0, 12),
      format: formatActions.filter((a) => matches(query, a.label, a.keywords)),
      align: alignActions.filter((a) => matches(query, a.label, a.keywords)),
      // Color/highlight lists are long by design (21 hues each) — only show
      // the full wall of swatches once the user starts typing, otherwise
      // just the "reset" entry so the palette doesn't feel overwhelming.
      color: query
        ? colorActions.filter((a) => matches(query, a.label, a.keywords))
        : colorActions.slice(0, 1),
      highlight: query
        ? highlightActions.filter((a) => matches(query, a.label, a.keywords))
        : highlightActions.slice(0, 1),
      insert: insertionActions.filter((a) => matches(query, a.label, a.keywords)).slice(0, 12),
      table: tableActions.filter((a) => matches(query, a.label, a.keywords)),
      history: historyActions.filter((a) => matches(query, a.label, a.keywords)),
      emoji: query
        ? gitHubEmojis.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 10)
        : [],
    };
  }, [query]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function runEditorAction(group: Exclude<CommandGroupKey, "emoji" | "app">, item: EditorAction) {
    item.action(editor);
    pushRecent({ group, id: item.id, label: item.label });
    close();
  }

  function runAppAction(item: AppAction) {
    item.run(ctx);
    pushRecent({ group: "app", id: item.id, label: item.label });
    close();
  }

  function runRecent(entry: RecentEntry) {
    const pools: Record<Exclude<CommandGroupKey, "emoji">, (EditorAction | AppAction)[]> = {
      app: appActions,
      turnInto: turnIntoActions,
      format: formatActions,
      align: alignActions,
      color: colorActions,
      highlight: highlightActions,
      insert: insertionActions,
      table: tableActions,
      history: historyActions,
    };
    const item = pools[entry.group].find((a) => a.id === entry.id);
    if (!item) return;
    if (entry.group === "app") runAppAction(item as AppAction);
    else runEditorAction(entry.group, item as EditorAction);
  }

  const showRecents = !query && recents.length > 0;

  function renderEditorGroup(group: Exclude<CommandGroupKey, "emoji" | "app">, items: EditorAction[]) {
    if (items.length === 0) return null;
    return (
      <CommandGroup key={group} heading={GROUP_LABELS[group]}>
        {items.map((item) => (
          <CommandItem key={item.id} onSelect={() => runEditorAction(group, item)}>
            {item.swatch ? <ColorSwatch hex={item.swatch} /> : item.icon ? <item.icon /> : null}
            <span>{item.label}</span>
            {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <CommandInput placeholder="Search a command or type to insert…" value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>

          {showRecents && (
            <>
              <CommandGroup heading="Recent">
                {recents.map((entry) => (
                  <CommandItem key={`recent-${entry.group}-${entry.id}`} onSelect={() => runRecent(entry)}>
                    <Clock className="opacity-60" />
                    <span>{entry.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {filtered.app.length > 0 && (
            <CommandGroup heading="Actions">
              {filtered.app.map((item) => {
                const disabled = item.disabled?.(ctx) ?? false;
                return (
                  <CommandItem key={item.id} disabled={disabled} onSelect={() => !disabled && runAppAction(item)}>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {renderEditorGroup("turnInto", filtered.turnInto)}
          {renderEditorGroup("format", filtered.format)}
          {renderEditorGroup("align", filtered.align)}
          {renderEditorGroup("color", filtered.color)}
          {renderEditorGroup("highlight", filtered.highlight)}
          {renderEditorGroup("insert", filtered.insert)}
          {renderEditorGroup("table", filtered.table)}
          {renderEditorGroup("history", filtered.history)}

          {filtered.emoji.length > 0 && (
            <CommandGroup heading="Emoji">
              {filtered.emoji.map((item) => (
                <CommandItem
                  key={item.name}
                  onSelect={() => {
                    editor.chain().focus().setEmoji(item.shortcodes[0]).run();
                    close();
                  }}
                >
                  <span className="mr-1">{item.emoji}</span>
                  <span>{item.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}