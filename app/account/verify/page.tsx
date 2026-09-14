"use client";

import { AuthClient } from "@/auth/auth-client";
import { CheckCheck, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const authclient = AuthClient;
    const searchParam = useSearchParams();
    const email = searchParam.get("email");
    function SendMail() {
        authclient.sendVerificationEmail({
            email: email || "",
            callbackURL: "/account/welcome",
        });
    }
    return (
        <main className="flex justify-center items-center pt-64 h-[50vh] flex-col">
            <CheckIcon size={128} />
            <p>Verification E-mail has been sent to you</p>
            {email?.trim() == "" || email === null ? (
                <p>
                    Didn&apos;t Recieve Email{" "}
                    <span onClick={SendMail}>Resend</span>
                </p>
            ) : (
                <p>
                    No Email Provided goto{" "}
                    <Link href="/account/login">Login page</Link>
                </p>
            )}
        </main>
    );
}
