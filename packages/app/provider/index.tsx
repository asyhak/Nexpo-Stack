"use client";
import React from "react";
import { GluestackUIProvider } from "@repo/ui";
import { Platform } from "react-native";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        <SafeAreaProvider
          initialMetrics={
            Platform.OS === "web"
              ? {
                  frame: { x: 0, y: 0, width: 0, height: 0 },
                  insets: { top: 0, left: 0, right: 0, bottom: 0 },
                }
              : initialWindowMetrics
          }
        >
          {children}
        </SafeAreaProvider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
