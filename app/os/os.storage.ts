import { Slot, Tool } from "./os.types";
import { slotsArraySchema, toolsArraySchema } from "./os.schemas";
import { defaultSlots, defaultTools } from "./os.data";

const SLOTS_KEY = "qos:slots";
const TOOLS_KEY = "qos:tools";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch (err) {
    // Private-browsing modes, storage quota, disabled storage, etc.
    console.error(`Couldn't read "${key}" from localStorage`, err);
    return null;
  }
}

function safeSetItem(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Couldn't write "${key}" to localStorage`, err);
  }
}

/**
 * Runs once, the very first time the page is opened on a browser: writes
 * default data for any key that doesn't exist yet. If a key is already
 * present (even from a previous, since-cleared-of-content session) this is
 * a no-op for that key — the user's own data always wins. Safe to call on
 * every mount, including React Strict Mode's intentional double-invoke.
 */
export function ensureSeeded(): void {
  if (!isBrowser()) return;

  if (window.localStorage.getItem(SLOTS_KEY) === null) {
    safeSetItem(SLOTS_KEY, defaultSlots);
  }
  if (window.localStorage.getItem(TOOLS_KEY) === null) {
    safeSetItem(TOOLS_KEY, defaultTools);
  }
}

export function loadSlots(): Slot[] {
  const raw = safeGetItem(SLOTS_KEY);
  if (!raw) return defaultSlots;

  try {
    const parsed = slotsArraySchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : defaultSlots;
  } catch {
    return defaultSlots;
  }
}

export function saveSlots(slots: Slot[]): void {
  safeSetItem(SLOTS_KEY, slots);
}

export function loadTools(): Tool[] {
  const raw = safeGetItem(TOOLS_KEY);
  if (!raw) return defaultTools;

  try {
    const parsed = toolsArraySchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : defaultTools;
  } catch {
    return defaultTools;
  }
}

export function saveTools(tools: Tool[]): void {
  safeSetItem(TOOLS_KEY, tools);
}
