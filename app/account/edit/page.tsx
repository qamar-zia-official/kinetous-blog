"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";

import { AuthClient } from "@/auth/auth-client";

const formSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, "Name cannot be smaller than 3 characters")
            .max(50, "Name cannot be longer than 50 characters"),

        email: z.string().trim().email("Input a valid E-Mail address"),

        image: z
            .string()
            .url("Image should be a valid URL")
            .optional()
            .or(z.literal("")),

        currentPassword: z.string().optional(),

        newPassword: z
            .string()
            .optional()
            .refine(
                (value) => !value || value.length >= 8,
                "Password must be at least 8 characters",
            ),

        confirmPassword: z.string().optional(),
    })
    .refine(
        (data) => {
            // No new password means there is nothing to confirm.
            if (!data.newPassword) return true;

            return data.newPassword === data.confirmPassword;
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        },
    )
    .refine(
        (data) => {
            // A new password requires the current password.
            if (!data.newPassword) return true;

            return Boolean(data.currentPassword);
        },
        {
            message: "Current password is required to change your password",
            path: ["currentPassword"],
        },
    );

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
    const { data, isPending } = AuthClient.useSession();

    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            image: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    /*
     * Populate the form once the session becomes available.
     *
     * Important:
     * reset() is preferable to calling setValue() repeatedly here.
     */
    useEffect(() => {
        if (!data?.user) return;

        form.reset({
            name: data.user.name ?? "",
            email: data.user.email ?? "",
            image: data.user.image ?? "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    }, [data?.user, form]);

    const image = form.watch("image");
    const newPassword = form.watch("newPassword");

    const handleSubmit = async (values: FormValues) => {
        setServerError(null);
        setSuccessMessage(null);
        setIsSaving(true);

        try {
            /*
             * ---------------------------------------------------------
             * 1. Update normal profile information
             * ---------------------------------------------------------
             *
             * Better Auth's updateUser() supports user profile fields
             * such as name and image.
             */
            const profileChanged =
                values.name !== (data?.user?.name ?? "") ||
                values.image !== (data?.user?.image ?? "");

            if (profileChanged) {
                const result = await AuthClient.updateUser({
                    name: values.name,
                    image: values.image || null,
                });

                if (result.error) {
                    throw new Error(
                        result.error.message || "Failed to update profile",
                    );
                }
            }

            /*
             * ---------------------------------------------------------
             * 2. Change email separately
             * ---------------------------------------------------------
             *
             * Depending on your Better Auth configuration, changing an
             * email may require verification.
             */
            const emailChanged =
                values.email.toLowerCase() !==
                (data?.user?.email ?? "").toLowerCase();

            if (emailChanged) {
                const result = await AuthClient.changeEmail({
                    newEmail: values.email,
                    callbackURL: "/account",
                });

                if (result.error) {
                    throw new Error(
                        result.error.message || "Failed to change email",
                    );
                }
            }

            /*
             * ---------------------------------------------------------
             * 3. Change password separately
             * ---------------------------------------------------------
             */
            if (values.newPassword) {
                const result = await AuthClient.changePassword({
                    currentPassword: values.currentPassword!,
                    newPassword: values.newPassword,
                    revokeOtherSessions: true,
                });

                if (result.error) {
                    throw new Error(
                        result.error.message || "Failed to change password",
                    );
                }
            }

            form.reset({
                ...values,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setSuccessMessage(
                emailChanged
                    ? "Your account was updated. Check your email if verification is required."
                    : "Your account was updated successfully.",
            );
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while updating your account.",
            );
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <main className="mx-auto max-w-xl p-6">
                <p>Loading your account...</p>
            </main>
        );
    }

    if (!data?.user) {
        return (
            <main className="mx-auto max-w-xl p-6">
                <h1 className="text-2xl font-semibold">
                    Edit Your Account Information
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    You must be signed in to edit your account.
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-xl p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold">
                    Edit Your Account Information
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                    Update your profile, email address, password, and profile
                    picture.
                </p>
            </div>

            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
            >
                {/* ---------------------------------------------------- */}
                {/* Profile picture                                      */}
                {/* ---------------------------------------------------- */}

                <section className="space-y-3">
                    <div>
                        <label className="font-medium">Profile picture</label>

                        <p className="text-sm text-gray-500">
                            JPG, PNG, WEBP, etc.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100">
                            {image ? (
                                <img
                                    src={image}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                                    No image
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <CldUploadWidget
                                uploadPreset={
                                    process.env
                                        .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                                }
                                options={{
                                    cloudName:
                                        process.env
                                            .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                                    sources: ["local", "camera"],
                                    multiple: false,
                                    maxFiles: 1,
                                    resourceType: "image",
                                    cropping: true,
                                    croppingAspectRatio: 1,
                                    clientAllowedFormats: [
                                        "jpg",
                                        "jpeg",
                                        "png",
                                        "webp",
                                    ],
                                    maxFileSize: 5_000_000,
                                }}
                                onSuccess={(result) => {
                                    if (
                                        typeof result.info === "object" &&
                                        result.info !== null &&
                                        "secure_url" in result.info
                                    ) {
                                        const secureUrl = (
                                            result.info as {
                                                secure_url?: string;
                                            }
                                        ).secure_url;

                                        if (secureUrl) {
                                            form.setValue("image", secureUrl, {
                                                shouldDirty: true,
                                                shouldValidate: true,
                                            });
                                        }
                                    }
                                }}
                                onError={() => {
                                    setServerError(
                                        "Image upload failed. Please try again.",
                                    );
                                }}
                            >
                                {({ open }) => (
                                    <button
                                        type="button"
                                        onClick={() => open()}
                                        className="rounded-md border px-4 py-2 text-sm font-medium"
                                    >
                                        Upload image
                                    </button>
                                )}
                            </CldUploadWidget>

                            {image && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        form.setValue("image", "", {
                                            shouldDirty: true,
                                        })
                                    }
                                    className="text-left text-sm text-red-600"
                                >
                                    Remove image
                                </button>
                            )}
                        </div>
                    </div>

                    {form.formState.errors.image && (
                        <p className="text-sm text-red-600">
                            {form.formState.errors.image.message}
                        </p>
                    )}
                </section>

                {/* ---------------------------------------------------- */}
                {/* Name                                                  */}
                {/* ---------------------------------------------------- */}

                <div className="space-y-2">
                    <label htmlFor="name" className="font-medium">
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        {...form.register("name")}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="John Doe"
                    />

                    {form.formState.errors.name && (
                        <p className="text-sm text-red-600">
                            {form.formState.errors.name.message}
                        </p>
                    )}
                </div>

                {/* ---------------------------------------------------- */}
                {/* Email                                                 */}
                {/* ---------------------------------------------------- */}

                <div className="space-y-2">
                    <label htmlFor="email" className="font-medium">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...form.register("email")}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="you@example.com"
                    />

                    {form.formState.errors.email && (
                        <p className="text-sm text-red-600">
                            {form.formState.errors.email.message}
                        </p>
                    )}

                    <p className="text-xs text-gray-500">
                        Changing your email may require email verification.
                    </p>
                </div>

                {/* ---------------------------------------------------- */}
                {/* Password section                                     */}
                {/* ---------------------------------------------------- */}

                <section className="border-t pt-6">
                    <div className="mb-4">
                        <h2 className="font-semibold">Change password</h2>

                        <p className="text-sm text-gray-500">
                            Leave these fields empty if you do not want to
                            change your password.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="currentPassword"
                                className="font-medium"
                            >
                                Current password
                            </label>

                            <input
                                id="currentPassword"
                                type="password"
                                autoComplete="current-password"
                                {...form.register("currentPassword")}
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="Your current password"
                            />

                            {form.formState.errors.currentPassword && (
                                <p className="text-sm text-red-600">
                                    {
                                        form.formState.errors.currentPassword
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="newPassword"
                                className="font-medium"
                            >
                                New password
                            </label>

                            <input
                                id="newPassword"
                                type="password"
                                autoComplete="new-password"
                                {...form.register("newPassword")}
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="At least 8 characters"
                            />

                            {form.formState.errors.newPassword && (
                                <p className="text-sm text-red-600">
                                    {form.formState.errors.newPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="font-medium"
                            >
                                Confirm new password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                {...form.register("confirmPassword")}
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="Repeat your new password"
                            />

                            {form.formState.errors.confirmPassword && (
                                <p className="text-sm text-red-600">
                                    {
                                        form.formState.errors.confirmPassword
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        {newPassword && (
                            <p className="text-xs text-gray-500">
                                Changing your password will sign you out of your
                                other sessions.
                            </p>
                        )}
                    </div>
                </section>

                {/* ---------------------------------------------------- */}
                {/* Server feedback                                      */}
                {/* ---------------------------------------------------- */}

                {serverError && (
                    <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                    >
                        {serverError}
                    </div>
                )}

                {successMessage && (
                    <div
                        role="status"
                        className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                    >
                        {successMessage}
                    </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* Submit                                                */}
                {/* ---------------------------------------------------- */}

                <button
                    type="submit"
                    disabled={isSaving || !form.formState.isDirty}
                    className="w-full rounded-md bg-black px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSaving ? "Saving..." : "Save changes"}
                </button>
            </form>
        </main>
    );
}
