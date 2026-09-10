import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Everything under here requires a signed-in user. This does NOT check
// post ownership (edit /publish/[blogSlug] for a post you don't own is
// still blocked, but by the ownership check in db/blog/update-blog.ts and
// remove-blog.ts, not here) — middleware runs on the edge and can't
// affordably hit the DB to look up a post's authorId on every request. It
// only answers "is someone logged in at all".
const PROTECTED_PREFIXES = ["/publish", "/account/dashboard"];

// Auth pages themselves must stay reachable while logged out, obviously.
const PUBLIC_ACCOUNT_PATHS = [
    "/account/login",
    "/account/signup",
    "/account/error",
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublicAccountPath = PUBLIC_ACCOUNT_PATHS.some((p) =>
        pathname.startsWith(p),
    );
    const needsAuth =
        PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) &&
        !isPublicAccountPath;

    if (!needsAuth) return NextResponse.next();

    // getSessionCookie only checks that a plausibly-valid session cookie is
    // present — it doesn't verify the session against the DB (that would
    // mean a DB round trip on every proxied request, which is too slow for
    // middleware). It's a presence check, not proof of a valid session.
    // Expired/forged cookies still get through this gate but are rejected
    // by auth.api.getSession() the moment a server action or page actually
    // uses the session (see lib/auth-guard.ts) — so this layer only ever
    // saves a logged-out visitor a redirect, it's never the last line of
    // defense.
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        const loginUrl = new URL("/account/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/publish/:path*", "/account/dashboard/:path*"],
};
