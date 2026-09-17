import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/db/index";
import * as schema from "@/db/schemas/schema";
import { Resend } from "resend";
const mail = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    trustedOrigins: ["https://*.kinetous.com", "https://kinetous.com"],
    appName: "Kinetous Inventory MGMT",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRETE!,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRETE!,
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
            await mail.emails.send({
                from: "Kinetous <auth@kinetous.com>",
                to: user.email,
                subject: "Verify Your Kinetous Account Email",
                html: `
                    <div
                        style="
                    display: none;
                    max-height: 0;
                    overflow: hidden;
                    opacity: 0;
                    color: transparent;
                  "
                    >
                        One quick step before you can start using your account.
                    </div>

                    <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="background-color: #09090b; margin: 0; padding: 0;"
                    >
                        <tr>
                            <td align="center" style="padding: 48px 16px;">
                                <!-- Main Container -->
                                <table
                                    role="presentation"
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    style="
                          max-width: 600px;
                          background-color: #111113;
                          border: 1px solid #27272a;
                          border-radius: 18px;
                          overflow: hidden;
                        "
                                >
                                    <!-- Top Accent -->
                                    <tr>
                                        <td
                                            style="
                              height: 3px;
                              background: linear-gradient(
                                90deg,
                                #6366f1,
                                #8b5cf6,
                                #ec4899
                              );
                              font-size: 0;
                              line-height: 0;
                            "
                                        >
                                            &nbsp;
                                        </td>
                                    </tr>

                                    <!-- Header -->
                                    <tr>
                                        <td
                                            style="padding: 34px 40px 20px 40px;"
                                        >
                                            <table
                                                role="presentation"
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                            >
                                                <tr>
                                                    <!-- Logo -->
                                                    <td align="left">
                                                        <div
                                                            style="
                                      display: inline-block;
                                      width: 38px;
                                      height: 38px;
                                      line-height: 38px;
                                      text-align: center;
                                      background-color: #fafafa;
                                      color: #09090b;
                                      border-radius: 10px;
                                      font-size: 17px;
                                      font-weight: 800;
                                      letter-spacing: -1px;
                                    "
                                                        >
                                                        Kinetous
                                                        </div>
                                                    </td>

                                                    <!-- Badge -->
                                                    <td align="right">
                                                        <span
                                                            style="
                                      display: inline-block;
                                      padding: 6px 10px;
                                      border: 1px solid #27272a;
                                      border-radius: 999px;
                                      color: #a1a1aa;
                                      font-size: 11px;
                                      font-weight: 600;
                                      letter-spacing: 0.04em;
                                      text-transform: uppercase;
                                    "
                                                        >
                                                            Account security
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Divider -->
                                    <tr>
                                        <td style="padding: 0 40px;">
                                            <div
                                                style="
                                height: 1px;
                                background-color: #27272a;
                                font-size: 0;
                              "
                                            ></div>
                                        </td>
                                    </tr>

                                    <!-- Content -->
                                    <tr>
                                        <td
                                            style="padding: 44px 40px 20px 40px;"
                                        >
                                            <!-- Eyebrow -->
                                            <p
                                                style="
                                margin: 0 0 14px 0;
                                color: #818cf8;
                                font-size: 12px;
                                line-height: 18px;
                                font-weight: 700;
                                letter-spacing: 0.12em;
                                text-transform: uppercase;
                              "
                                            >
                                                Almost there
                                            </p>

                                            <!-- Heading -->
                                            <h1
                                                style="
                                margin: 0;
                                color: #fafafa;
                                font-size: 36px;
                                line-height: 42px;
                                font-weight: 750;
                                letter-spacing: -0.04em;
                              "
                                            >
                                                Verify your<br />
                                                email address.
                                            </h1>

                                            <!-- Description -->
                                            <p
                                                style="
                                margin: 22px 0 0 0;
                                color: #a1a1aa;
                                font-size: 16px;
                                line-height: 26px;
                              "
                                            >
                                                Welcome aboard. Before you start
                                                exploring everything
                                                <strong style="color: #d4d4d8;"
                                                    >YourBrand</strong
                                                >
                                                has to offer, we just need to
                                                make sure this email address
                                                belongs to you.
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- Verification Card -->
                                    <tr>
                                        <td
                                            style="padding: 16px 40px 30px 40px;"
                                        >
                                            <table
                                                role="presentation"
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                style="
                                background-color: #18181b;
                                border: 1px solid #27272a;
                                border-radius: 14px;
                              "
                                            >
                                                <tr>
                                                    <td style="padding: 24px;">
                                                        <!-- Icon -->
                                                        <div
                                                            style="
                                      width: 42px;
                                      height: 42px;
                                      line-height: 42px;
                                      text-align: center;
                                      background-color: #27272a;
                                      border-radius: 11px;
                                      color: #a5b4fc;
                                      font-size: 19px;
                                      margin-bottom: 16px;
                                    "
                                                        >
                                                            ✓
                                                        </div>

                                                        <p
                                                            style="
                                      margin: 0;
                                      color: #fafafa;
                                      font-size: 15px;
                                      line-height: 22px;
                                      font-weight: 650;
                                    "
                                                        >
                                                            Confirm your email
                                                        </p>

                                                        <p
                                                            style="
                                      margin: 6px 0 20px 0;
                                      color: #71717a;
                                      font-size: 13px;
                                      line-height: 20px;
                                    "
                                                        >
                                                            This link will
                                                            securely verify your
                                                            account.
                                                        </p>

                                                        <!-- CTA -->
                                                        <table
                                                            role="presentation"
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                        >
                                                            <tr>
                                                                <td
                                                                    align="center"
                                                                    style="
                                          border-radius: 9px;
                                          background-color: #fafafa;
                                        "
                                                                >
                                                                    <a
                                                                        href="${url}"
                                                                        target="_blank"
                                                                        style="
                                            display: inline-block;
                                            padding: 13px 21px;
                                            color: #09090b;
                                            font-size: 14px;
                                            line-height: 20px;
                                            font-weight: 700;
                                            text-decoration: none;
                                            border-radius: 9px;
                                          "
                                                                    >
                                                                        Verify
                                                                        my email
                                                                        &nbsp; →
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Alternative URL -->
                                    <tr>
                                        <td style="padding: 0 40px 30px 40px;">
                                            <p
                                                style="
                                margin: 0 0 8px 0;
                                color: #52525b;
                                font-size: 11px;
                                line-height: 16px;
                                text-transform: uppercase;
                                letter-spacing: 0.08em;
                                font-weight: 700;
                              "
                                            >
                                                Button not working?
                                            </p>

                                            <p
                                                style="
                                margin: 0;
                                color: #71717a;
                                font-size: 12px;
                                line-height: 19px;
                                word-break: break-all;
                              "
                                            >
                                                Copy and paste this link into
                                                your browser:
                                            </p>

                                            <p
                                                style="
                                margin: 7px 0 0 0;
                                color: #818cf8;
                                font-size: 12px;
                                line-height: 19px;
                                word-break: break-all;
                              "
                                            >
                                                ${url}
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- Expiration Notice -->
                                    <tr>
                                        <td style="padding: 0 40px 36px 40px;">
                                            <table
                                                role="presentation"
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                            >
                                                <tr>
                                                    <td
                                                        style="
                                    padding: 14px 16px;
                                    background-color: #18181b;
                                    border-radius: 9px;
                                    border: 1px solid #27272a;
                                  "
                                                    >
                                                        <p
                                                            style="
                                      margin: 0;
                                      color: #71717a;
                                      font-size: 12px;
                                      line-height: 19px;
                                    "
                                                        >
                                                            <strong
                                                                style="color: #a1a1aa;"
                                                            >
                                                                Security note:
                                                            </strong>
                                                            This verification
                                                            link is unique to
                                                            your account. If you
                                                            didn't create an
                                                            account with us, you
                                                            can safely ignore
                                                            this email.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Footer -->
                                <table
                                    role="presentation"
                                    width="100%"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    style="max-width: 600px;"
                                >
                                    <tr>
                                        <td
                                            align="center"
                                            style="padding: 24px 20px 10px 20px;"
                                        >
                                            <p
                                                style="
                                margin: 0;
                                color: #52525b;
                                font-size: 11px;
                                line-height: 18px;
                              "
                                            >
                                                © ${new Date().getFullYear()}
                                                YourBrand
                                            </p>

                                            <p
                                                style="
                                margin: 5px 0 0 0;
                                color: #3f3f46;
                                font-size: 10px;
                                line-height: 17px;
                              "
                                            >
                                                You received this email because
                                                an account was created using
                                                this address.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                `,
            });
        },
        autoSignInAfterVerification: true,
    },
});
