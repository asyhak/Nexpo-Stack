import { StateStorage } from "zustand/middleware";
import { Platform } from "react-native";

/**
 * Universal Storage Utility
 * Switches between LocalStorage (Web) and AsyncStorage (Native)
 * Handles SSR for Next.js
 */

const isWeb = Platform.OS === "web";

const createUniversalStorage = (): StateStorage => {
  if (isWeb) {
    return {
      getItem: (name: string) => {
        if (typeof window === "undefined") return null;
        return window.localStorage.getItem(name);
      },
      setItem: (name: string, value: string) => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(name, value);
      },
      removeItem: (name: string) => {
        if (typeof window === "undefined") return;
        window.localStorage.removeItem(name);
      },
    };
  }

  // Fallback to AsyncStorage for Native
  // We use dynamic import or require to avoid crashing Web if the package is missing/failing
  try {
    const AsyncStorage =
      require("@react-native-async-storage/async-storage").default;
    return AsyncStorage;
  } catch (error) {
    console.warn(
      "AsyncStorage not found, falling back to dummy storage",
      error,
    );
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
};

export const universalStorage = createUniversalStorage();
