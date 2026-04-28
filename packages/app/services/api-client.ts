import { hc } from "hono/client";
import type { AppType } from "server";
import { env } from "@repo/env/native";
import { authClient } from "./auth-client";

const BASE_URL = env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const apiClient = hc<AppType>(BASE_URL, {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    const cookies = authClient.getCookie();
    const headers = new Headers(init?.headers);
    if (cookies) {
      headers.set("Cookie", cookies);
    }
    return fetch(input, {
      ...init,
      headers,
      credentials: "omit",
    });
  },
});
