export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export function ok<T>(data: T): ActionResult<T> {
  return { success: true, data };
}

export function fail(e: unknown): ActionResult<never> {
  console.error(e);
  const message = e instanceof Error ? e.message : "Something went wrong";
  return { success: false, error: message };
}