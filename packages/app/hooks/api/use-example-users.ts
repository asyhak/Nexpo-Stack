import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ExampleUser, ExampleUserSchema, CreateUserForm } from "@repo/schema";
import { apiClient } from "../../services/api-client";
import { useAuth } from "../../provider/auth-provider";

/**
 * EXAMPLE: TanStack Query hooks for User data
 * TODO: Remove this file when starting a new project.
 */

export const useUsers = () => {
  const { isAuthenticated, user } = useAuth();

  return useQuery({
    // Adding user.id to queryKey ensures it re-fetches when user changes
    queryKey: ["example-users", user?.id],
    queryFn: async (): Promise<ExampleUser[]> => {
      const res = await apiClient.api.users.$get();
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      // Validate with Zod for runtime safety
      return data.map((item: any) => ExampleUserSchema.parse(item));
    },
    // Only fetch if authenticated
    enabled: isAuthenticated,
  });
};
