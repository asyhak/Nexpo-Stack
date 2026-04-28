import { expo } from "@better-auth/expo";
import { createDb } from "@repo/db";
import * as schema from "@repo/db/schema";
import { env } from "@repo/env/server";
import { APP_SCHEME } from "@repo/env/constants";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

export function createAuth() {
  const db = createDb();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: schema,
    }),
    trustedOrigins: [
      env.CORS_ORIGIN,
      `${APP_SCHEME}://`,
      ...(env.NODE_ENV === "development"
        ? [
            "exp://",
            "exp://**",
            "exp://192.168.*.*:*/**",
            "http://localhost:8081",
          ]
        : []),
    ],
    emailAndPassword: {
      enabled: true,
    },
    // account: {
    //   accountLinking: {
    //     enabled: true, // Enable account linking (default: true)
    //     trustedProviders: ["google", "magic-link"], // Providers that can auto-link
    //     allowDifferentEmails: false, // Only link if emails match (recommended)
    //   },
    // },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    advanced: {
      defaultCookieAttributes: {
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
        secure: env.NODE_ENV === "production",
        httpOnly: true,
      },
    },
    plugins: [expo(), openAPI()],
  });
}

export const auth = createAuth();
