import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ExampleUser,
  ExampleUserSchema,
  CreateUserForm,
} from "@repo/contracts";
import { apiClient } from "../../services/api-client";

/**
 * EXAMPLE: TanStack Query hooks for User data
 * TODO: Remove this file when starting a new project.
 */

export const useUsers = () => {
  return useQuery({
    queryKey: ["example-users"],
    queryFn: async (): Promise<ExampleUser[]> => {
      const data = await apiClient<any[]>("/users");
      // Validate with Zod for runtime safety
      return data.map((item: any) => ExampleUserSchema.parse(item));
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: CreateUserForm) => {
      return apiClient("/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
    },
    onSuccess: () => {
      // In a real app, we would invalidate the query
      // queryClient.invalidateQueries({ queryKey: ["example-users"] });
      console.log("User created successfully (mocked)");
    },
  });
};
