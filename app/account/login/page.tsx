"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsGithub, BsGoogle } from "react-icons/bs";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/account/dashboard";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const { data, isPending } = AuthClient.useSession();
    useEffect(() => {
        if (!isPending && data?.user !== null) {
            router.push(next);
        }
    }, [data, isPending]);

    async function handleEmailLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setPending(true);
        const { error: signInError } = await AuthClient.signIn.email({
            email,
            password,
        });
        setPending(false);
        if (signInError) {
            setError(
                signInError.message ??
                    "Couldn't sign you in with those details.",
            );
            return;
        }
        router.push(next);
        router.refresh();
    }

    async function handleSocial(provider: "google" | "github") {
        await AuthClient.signIn.social({
            provider,
            errorCallbackURL: "/account/error",
            callbackURL: next,
        });
    }

    return (
        <main className="min-h-screen flex justify-center items-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSocial("google")}
                        >
                            <BsGoogle /> Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSocial("github")}
                        >
                            <BsGithub /> GitHub
                        </Button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="h-px flex-1 bg-border" />
                        or
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-3">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && (
                            <p
                                className="text-sm text-destructive"

                                role="alert"
                            >
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"

                            className="w-full"

                            disabled={pending}
                        >
                            {pending ? "Signing in…" : "Log in"}
                        </Button>
                    </form>

                    <p className="text-sm text-muted-foreground text-center">
                        Don&apos;t have an account?{" "}
                        <Link href="/account/signup" className="underline">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
