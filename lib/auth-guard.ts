import "server-only";
import { headers } from "next/headers";
import { auth } from "@/auth/auth";

export type CurrentUser = { id: string; name: string; email: string };

/**
 * Reads the current better-auth session from request headers. Returns
 * `null` if there's no valid session — never throws, so callers decide how
 * to respond (redirect vs. return an ActionResult failure).
 *
 * This is the server-side source of truth. Nothing in the UI (hidden
 * buttons, client-side redirects) is a substitute for this check — a
 * request to a server action can always be made directly, bypassing
 * whatever the UI shows.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;
    return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    };
}

/** Throws if there's no logged-in user. Use at the top of a server action
 * that requires *any* authenticated user (e.g. creating a post). */
export async function requireUser(): Promise<CurrentUser> {
    const user = await getCurrentUser();
    if (!user) throw new AuthError("You need to be signed in to do that.");
    return user;
}

/** Throws unless the logged-in user is the given resource's author. Use in
 * server actions that mutate a specific post (update/delete) — this is
 * the check that was completely missing from updateBlog/removeBlog, which
 * meant *any* caller could edit or delete *any* post. */
export async function requireOwner(authorId: string): Promise<CurrentUser> {
    const user = await requireUser();
    if (user.id !== authorId) {
        throw new AuthError("You can only edit or delete posts you wrote.");
    }
    return user;
}

export class AuthError extends Error {}
