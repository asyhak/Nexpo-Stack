import { QueryClient } from "@tanstack/react-query";

/**
 * Shared QueryClient instance.
 * Using a singleton or a factory function ensures consistency.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});
