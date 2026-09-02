import { z } from "zod";

/**
 * Single source of truth for the domain types. Types are inferred from
 * these schemas (never hand-duplicated) so storage, forms, and components
 * all agree on shape — see os.types.ts for the re-exported types.
 */

// ---------------------------------------------------------------------------
// Priority
// ---------------------------------------------------------------------------

export const priorityValues = ["Severe", "High", "Moderate", "Low"] as const;
export const prioritySchema = z.enum(priorityValues);
export type Priority = z.infer<typeof prioritySchema>;

// ---------------------------------------------------------------------------
// Slot (stored shape — times as [hour, minute] tuples)
// ---------------------------------------------------------------------------

const timeTupleSchema = z.tuple([
  z.number().int().min(0).max(23),
  z.number().int().min(0).max(59),
]);

export const slotSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  duration: z.string().min(1),
  priority: prioritySchema,
  details: z.string().min(1),
  /** 0 = Sunday ... 6 = Saturday */
  days: z.array(z.number().int().min(0).max(6)).min(1),
  from: timeTupleSchema,
  to: timeTupleSchema,
});
export type Slot = z.infer<typeof slotSchema>;

// ---------------------------------------------------------------------------
// Tool (a saved link, shown with its favicon)
// ---------------------------------------------------------------------------

export const toolSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(60),
  url: z.string().url(),
});
export type Tool = z.infer<typeof toolSchema>;

// ---------------------------------------------------------------------------
// Slot form (stored shape uses tuples; <input type="time"> gives "HH:MM"
// strings, so the form schema is a separate, string-based variant)
// ---------------------------------------------------------------------------

export const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Use HH:MM (24h) format");

export const slotFormSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(80),
    duration: z.string().min(1, "Duration label is required").max(40),
    priority: prioritySchema,
    details: z.string().min(1, "Details are required").max(2000),
    days: z
      .array(z.number().int().min(0).max(6))
      .min(1, "Pick at least one day"),
    from: timeStringSchema,
    to: timeStringSchema,
  })
  .refine((data) => data.from !== data.to, {
    message: "Start and end time can't be the same",
    path: ["to"],
  });
export type SlotFormValues = z.infer<typeof slotFormSchema>;

// ---------------------------------------------------------------------------
// Tool form
// ---------------------------------------------------------------------------

export const toolFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(60),
  url: z
    .string()
    .min(1, "URL is required")
    .url("Enter a full URL, e.g. https://example.com"),
});
export type ToolFormValues = z.infer<typeof toolFormSchema>;

// ---------------------------------------------------------------------------
// Array schemas, used to validate whatever comes back out of localStorage
// ---------------------------------------------------------------------------

export const slotsArraySchema = z.array(slotSchema);
export const toolsArraySchema = z.array(toolSchema);
