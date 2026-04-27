import { hc } from "hono/client";
import type { AppType } from "server";
import { env } from "@repo/env/web";

const BASE_URL = env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const apiClient = hc<AppType>(BASE_URL);
