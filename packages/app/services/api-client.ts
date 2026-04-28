import { hc } from "hono/client";
import type { AppType } from "server";
import { env } from "@repo/env/native";

const BASE_URL = env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export const apiClient = hc<AppType>(BASE_URL);
