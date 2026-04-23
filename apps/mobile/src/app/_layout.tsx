import { Stack } from "expo-router";
import "@repo/ui/global.css";
import { Provider } from "@repo/app/provider";
import "@repo/app/bones/registry";

export default function RootLayout() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
