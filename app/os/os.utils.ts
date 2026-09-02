export const DAY_ABBREVIATIONS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

/** Collision-safe-enough id for a single-user, local-storage-backed app. */
export function generateId(): string {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** "HH:MM" -> [hour, minute]. Assumes an already-validated time string. */
export function timeStringToTuple(value: string): [number, number] {
  const [h, m] = value.split(":").map(Number);
  return [h, m];
}

/** [hour, minute] -> "HH:MM", for populating <input type="time">. */
export function tupleToTimeString(tuple: [number, number]): string {
  const [h, m] = tuple;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Extracts a hostname from a URL, or null if the URL can't be parsed. */
export function getHostname(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/** Google's S2 favicon endpoint. Falls back to the raw url if it won't parse. */
export function faviconUrl(url: string, size = 64): string {
  const domain = getHostname(url) ?? url;
  return `https://www.google.com/s2/favicons?sz=${size}&domain=${encodeURIComponent(domain)}`;
}

/** Human-friendly summary of which days a slot is active. */
export function formatDays(days: number[]): string {
  if (days.length === 7) return "Every day";

  const weekdays = [1, 2, 3, 4, 5];
  const isWeekdaysOnly =
    days.length === 5 && weekdays.every((d) => days.includes(d));
  if (isWeekdaysOnly) return "Weekdays";

  return [...days]
    .sort((a, b) => a - b)
    .map((d) => DAY_ABBREVIATIONS[d])
    .join(" · ");
}
