"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { signInGoogle, signInGithub } from "../signup";
import { Input } from "@/components/ui/input";
import { AuthClient } from "@/auth/auth-client";
import { Controller, useForm } from "react-hook-form";
import z from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function Page() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();
    const authClient = AuthClient;

    const formSchema = z.object({
        name: z
            .string()
            .min(3, { message: "Name should be at least 3 characters" }),
        email: z.string().email({ message: "Email is required" }).nonempty(),
        password: z.string().min(8, "Password should be at least 8 characters"),
    });
    type formSchemaType = z.infer<typeof formSchema>;
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    async function handleSubmit(e: z.infer<typeof formSchema>) {
        setError(undefined);
        setPending(true);
        try {
            const res = await authClient.signUp.email(
                {
                    name: e.name,
                    email: e.email,
                    password: e.password,
                },
                {
                    onSuccess: () => {
                        router.push(
                            `/account/login?email=${encodeURIComponent(e.email)}&verified=false`,
                        );
                    },
                },
            );
            if (res.error) {
                setError(res.error.message);
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong creating your account.",
            );
        } finally {
            setPending(false);
        }
    }

    return (
        <main className="h-screen flex justify-center items-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={signInGoogle}
                        >
                            <BsGoogle /> Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={signInGithub}
                        >
                            <BsGithub /> Github
                        </Button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="h-px flex-1 bg-border" />
                        or
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-3"
                    >
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input {...field} />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="e.g... qamar@kinetous.com"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Password</FieldLabel>
                                        <Input type="password" {...field} />
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={pending}
                        >
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
            {error && (
                <p className="text-sm text-destructive text-center mt-4">
                    {error}
                </p>
            )}
        </main>
    );
}
