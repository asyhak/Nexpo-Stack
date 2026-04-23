import { env } from "@repo/env";

/**
 * Shared API Client configuration.
 * Uses the type-safe environment variables from @repo/env.
 */
const BASE_URL =
  env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `API Error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
