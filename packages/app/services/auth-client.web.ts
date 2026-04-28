import { createAuthClient } from "better-auth/react";

const baseURL =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) ||
  "http://localhost:3000";

export const authClient = createAuthClient({ baseURL });
