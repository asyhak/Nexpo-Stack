import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ExampleUser, ExampleUserSchema, CreateUserForm } from "@repo/schema";
import { apiClient } from "../../services/api-client";

/**
 * EXAMPLE: TanStack Query hooks for User data
 * TODO: Remove this file when starting a new project.
 */

export const useUsers = () => {
  return useQuery({
    queryKey: ["example-users"],
    queryFn: async (): Promise<ExampleUser[]> => {
      const res = await apiClient.api.users.$get();
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      // Validate with Zod for runtime safety
      return data.map((item: any) => ExampleUserSchema.parse(item));
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: CreateUserForm) => {
      const res = await apiClient.api.users.$post({
        json: newUser,
      });
      if (!res.ok) throw new Error("Failed to create user");
      return res.json();
    },
    onSuccess: () => {
      // In a real app, we would invalidate the query
      // queryClient.invalidateQueries({ queryKey: ["example-users"] });
      console.log("User created successfully (mocked)");
    },
  });
};
