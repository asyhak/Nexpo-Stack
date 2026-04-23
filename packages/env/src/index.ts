import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these on the client.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  /**
   * Environment variables available on the client (and server).
   *
   * 💡 You'll need to use `NEXT_PUBLIC_` as a prefix in Next.js apps.
   */
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().optional(),
    NEXT_PUBLIC_APP_VARIANT: z
      .enum(["development", "preview", "production"])
      .default("development"),
  },
  /**
   * Shared between server and client.
   */
  shared: {
    // Add shared variables here
  },
  /**
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to ensure they are available.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_VARIANT: process.env.NEXT_PUBLIC_APP_VARIANT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=""` will throw an error.
   */
  emptyStringAsUndefined: true,
});
