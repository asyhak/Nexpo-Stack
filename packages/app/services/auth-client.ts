import { createAuthClient } from "better-auth/react";

const baseURL =
  (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) ||
  "http://localhost:3000";

const { expoClient } = require("@better-auth/expo/client") as {
  expoClient: (opts: { scheme: string; storage: any }) => any;
};
const AsyncStorage =
  require("@react-native-async-storage/async-storage").default;

export const authClient = createAuthClient({
  baseURL,
  plugins: [expoClient({ scheme: "nexpo-stack", storage: AsyncStorage })],
});
