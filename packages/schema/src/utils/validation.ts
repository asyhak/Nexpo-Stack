import { z } from "zod";

/**
 * Utility to safely parse a Zod schema.
 * Throws a descriptive error if validation fails.
 */
export function validateData<T>(schema: z.ZodType<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      throw new Error(`Validation Failed: ${details}`);
    }
    throw error;
  }
}

/**
 * Utility to safely parse a Zod schema without throwing.
 */
export function safeValidateData<T>(schema: z.ZodType<T>, data: unknown) {
  return schema.safeParse(data);
}
