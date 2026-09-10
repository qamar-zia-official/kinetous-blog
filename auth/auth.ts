import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/db/index";
import * as schema from "@/db/schemas/schema"

export const auth = betterAuth({
    appName: "Kinetous Inventory MGMT",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }), emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRETE!,
        },
        github: {
          clientId: process.env.GITHUB_CLIENT_ID!,
          clientSecret: process.env.GITHUB_CLIENT_SECRETE!
        }
    },
});
