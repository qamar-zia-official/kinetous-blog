import { AuthClient } from "@/auth/auth-client";

export async function signInGoogle() {
    await AuthClient.signIn.social({
        provider: "google",
        errorCallbackURL: "/account/error",
        callbackURL: "/account/dashboard",
        newUserCallbackURL: "/account/dashboard",
    });
}

export async function signInGithub() {
    await AuthClient.signIn.social({
        provider: "github",
        errorCallbackURL: "/account/error",
        callbackURL: "/account/dashboard",
        newUserCallbackURL: "/account/dashboard",
    });
}
