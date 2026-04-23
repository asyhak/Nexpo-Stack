import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/**
 * EXAMPLE: Zustand store for User preferences
 * TODO: Remove this file when starting a new project.
 */

interface UserProfile {
  id: string;
  name: string;
  rank: string;
  class: string;
}

interface ExampleUserState {
  favorites: number[];
  searchQuery: string;
  user: UserProfile | null;
  toggleFavorite: (userId: number) => void;
  setSearchQuery: (query: string) => void;
  setUser: (user: UserProfile) => void;
  logout: () => void;
  clearFavorites: () => void;
}

export const useExampleUserStore = create<ExampleUserState>()(
  persist(
    (set) => ({
      favorites: [],
      searchQuery: "",
      user: null,
      toggleFavorite: (userId) =>
        set((state) => ({
          favorites: state.favorites.includes(userId)
            ? state.favorites.filter((id) => id !== userId)
            : [...state.favorites, userId],
        })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "example-user-storage",
      storage: createJSONStorage(() =>
        Platform.OS === "web" ? window.localStorage : AsyncStorage,
      ),
    },
  ),
);
