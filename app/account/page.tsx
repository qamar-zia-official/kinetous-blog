import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-guard";

// The previous version of this page called `AuthClient.getSession()`
// (a promise) from a client component and never awaited or used the
// result — it just rendered an empty `<h1></h1>` no matter who visited.
// /account is now just a router: signed-in visitors land on their
// dashboard, everyone else goes to login.
export default async function AccountPage() {
    const user = await getCurrentUser();
    redirect(user ? "/account/dashboard" : "/account/login");
}
