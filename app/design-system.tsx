import { cn } from "@/lib/utils";

// ── Shared Styling Utilities ──────────────────────────────────────────────────

/** High-contrast brand pill tags */
export const tagCn = cn(
  "font-mono text-xs font-medium py-1 px-3 rounded-full",
  "bg-blue-950/60 text-blue-300 border border-blue-800/50",
);

/** Section eyebrow labels */
export const eyebrowCn = cn(
  "text-xs font-semibold uppercase tracking-[0.35em] text-blue-400",
);

/** Shared motion configuration for spring animations */
export const SPRING = {
  type: "spring",
  damping: 18,
  stiffness: 220,
} as const;

/** Outbound ambient hover accent line decoration */
export const bottomHighlightCn = cn(
  "absolute bottom-0 left-6 right-6 h-px",
  "bg-gradient-to-r from-transparent via-blue-500 to-transparent",
  "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
);
