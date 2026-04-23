import { z } from "zod";

/**
 * EXAMPLE: User Schema for JSONPlaceholder API
 * TODO: Remove this file when starting a new project.
 */
export const ExampleUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: z
    .object({
      street: z.string(),
      suite: z.string(),
      city: z.string(),
      zipcode: z.string(),
      geo: z.object({
        lat: z.string(),
        lng: z.string(),
      }),
    })
    .optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  company: z
    .object({
      name: z.string(),
      catchPhrase: z.string(),
      bs: z.string(),
    })
    .optional(),
});

export type ExampleUser = z.infer<typeof ExampleUserSchema>;

/**
 * EXAMPLE: Form schema for creating a user
 * Demonstrates validation logic.
 */
export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export type CreateUserForm = z.infer<typeof CreateUserSchema>;
