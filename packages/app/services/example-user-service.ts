/**
 * EXAMPLE: Mock API service for demonstration.
 * TODO: Remove this file when starting a new project.
 *
 * In a real app, this would use fetch/axios to call your backend.
 */
export const fetchUser = async (id: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data fetching based on ID
  if (id === "1") {
    return {
      id: "1",
      name: "Jin-Woo Sung",
      rank: "S-Rank",
      class: "Shadow Monarch",
    };
  }

  // Return a generic user for any other ID instead of throwing
  return {
    id,
    name: `Hunter #${id}`,
    rank: "E-Rank",
    class: "Unknown",
  };
};
