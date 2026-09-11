import "server-only";
import { headers } from "next/headers";
import { auth } from "@/auth/auth";

export type CurrentUser = { id: string; name: string; email: string };

export async function getCurrentUser(): Promise<CurrentUser | null> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;
    return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    };
}

export async function requireUser(): Promise<CurrentUser> {
    const user = await getCurrentUser();
    if (!user) throw new AuthError("You need to be signed in to do that.");
    return user;
}

export async function requireOwner(authorId: string): Promise<CurrentUser> {
    const user = await requireUser();
    if (user.id !== authorId) {
        throw new AuthError("You can only edit or delete posts you wrote.");
    }
    return user;
}

export class AuthError extends Error {}
