import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PROTECTED_PREFIXES = ["/publish", "/account/dashboard"];

const PUBLIC_ACCOUNT_PATHS = [
    "/account/login",
    "/account/signup",
    "/account/error",
];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublicAccountPath = PUBLIC_ACCOUNT_PATHS.some((p) =>
        pathname.startsWith(p),
    );
    const needsAuth =
        PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) &&
        !isPublicAccountPath;

    if (!needsAuth) return NextResponse.next();

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
