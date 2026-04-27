import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";

// This expects the environment variables to be handled by the consuming app
// since NEXT_PUBLIC or EXPO_PUBLIC variables are app-specific.
export function createSharedAuthClient(baseURL: string, storage: any) {
  return createAuthClient({
    baseURL,
    plugins: [
      expoClient({
        scheme: "nexpo-stack",
        storage,
      }),
    ],
  });
}
