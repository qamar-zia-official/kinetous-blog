"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { signInGoogle, signInGithub } from "./signup";
import { InputGroup } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthClient } from "@/auth/auth-client";

export default function Page() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    // Previously this form rendered `<InputGroup><Input /></InputGroup>` with
    // no name/email/password fields and no submit handler at all — filling
    // it in and hitting enter did nothing. Now it actually calls
    // better-auth's email sign-up and routes into the (now-real) dashboard.
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setPending(true);
        const { error: signUpError } = await AuthClient.signUp.email({
            name,
            email,
            password,
        });
        setPending(false);
        if (signUpError) {
            setError(signUpError.message ?? "Couldn't create your account.");
            return;
        }
        router.push("/account/dashboard");
        router.refresh();
    }

    return (
        <main className="h-screen flex justify-center items-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <Button type="button" variant="outline" onClick={signInGoogle}>
                            <BsGoogle /> Google
                        </Button>
                        <Button type="button" variant="outline" onClick={signInGithub}>
                            <BsGithub /> Github
                        </Button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="h-px flex-1 bg-border" />
                        or
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <InputGroup>
                                <Input
                                    id="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <InputGroup>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <InputGroup>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        {error && (
                            <p className="text-sm text-destructive" role="alert">
                                {error}
                            </p>
                        )}

                        <Button type="submit" className="w-full" disabled={pending}>
                            {pending ? "Creating account…" : "Sign up"}
                        </Button>
                    </form>

                    <p className="text-sm text-muted-foreground text-center">
                        Already have an account?{" "}
                        <Link href="/account/login" className="underline">
                            Log in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
