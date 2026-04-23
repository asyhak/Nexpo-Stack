"use client";

import {
  ScreenWrapper,
  Box,
  Heading,
  VStack,
  Text,
  ExampleUserCard,
  ExampleUserSearch,
  Skeleton,
  Center,
} from "@repo/ui";
import { useUsers } from "../../hooks/api/use-example-users";
import { useExampleUserStore } from "../../store/example-user-store";
import { ScrollView } from "react-native";
import { ExampleUser } from "@repo/contracts";

const MOCK_USERS: Partial<ExampleUser>[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
];

/**
 * EXAMPLE: User Hub Screen
 * Demonstrates:
 * 1. TanStack Query for remote data fetching
 * 2. Zustand for global local state
 * 3. Zod for data contracts
 * 4. Premium Gluestack UI components
 *
 * TODO: Remove this feature folder when starting a new project.
 */

export function ExampleUserHubScreen() {
  const { data: users, isLoading, error } = useUsers();
  const { favorites, toggleFavorite, searchQuery, setSearchQuery } =
    useExampleUserStore();

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ScreenWrapper>
      <VStack className="flex-1">
        {/* Header */}
        <Box className="px-4 py-6 bg-card border-b border-border">
          <Heading size="2xl" className="text-foreground">
            User Hub
          </Heading>
          <Text size="sm" className="text-muted-foreground">
            Universal Public API Demo (JSONPlaceholder)
          </Text>
        </Box>

        {/* Search */}
        <ExampleUserSearch
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name or username..."
        />

        {/* Content */}
        <ScrollView className="flex-1">
          {error ? (
            <Center className="py-20">
              <Text className="text-destructive font-bold">
                Failed to load users
              </Text>
              <Text size="sm" className="text-muted-foreground">
                Please check your connection and try again.
              </Text>
            </Center>
          ) : (
            <Skeleton
              name="user-hub-list"
              loading={isLoading}
              fixture={
                <VStack className="p-2 pb-10">
                  {MOCK_USERS.map((user) => (
                    <ExampleUserCard
                      key={user.id}
                      name={user.name!}
                      email={user.email!}
                      username={user.username!}
                      isFavorite={false}
                      onToggleFavorite={() => {}}
                    />
                  ))}
                </VStack>
              }
            >
              <VStack className="p-2 pb-10">
                {filteredUsers?.length === 0 ? (
                  <Center className="py-20">
                    <Text size="lg" className="text-muted-foreground">
                      No users found matching "{searchQuery}"
                    </Text>
                  </Center>
                ) : (
                  filteredUsers?.map((user) => (
                    <ExampleUserCard
                      key={user.id}
                      name={user.name}
                      email={user.email}
                      username={user.username}
                      isFavorite={favorites.includes(user.id)}
                      onToggleFavorite={() => toggleFavorite(user.id)}
                    />
                  ))
                )}
              </VStack>
            </Skeleton>
          )}
        </ScrollView>
      </VStack>
    </ScreenWrapper>
  );
}
