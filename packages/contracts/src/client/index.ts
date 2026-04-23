import { z } from "zod";
import { ExampleUser } from "../models/example-user";
import { validateData } from "../utils/validation";

/**
 * EXAMPLE: API Client Interface
 * TODO: Remove this file when starting a new project.
 */

/**
 * Standard interface for the API service.
 * This ensures consistency across different implementations (e.g. Mock vs Real API).
 */
export interface IApiInterface {
  getUser(id: string): Promise<ExampleUser>;
  updateUser(id: string, data: Partial<ExampleUser>): Promise<ExampleUser>;
}

/**
 * Shared error handler for consistent API reporting.
 */
export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Helper to validate API responses against a Zod schema.
 * Use this in your API service implementations.
 */
export function validateResponse<T>(schema: z.ZodType<T>, data: unknown): T {
  try {
    return validateData(schema, data);
  } catch (error) {
    throw new ApiError(
      error instanceof Error ? error.message : "Invalid API response structure",
      500,
    );
  }
}
