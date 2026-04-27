"use client";

/**
 * EXAMPLE: Home Screen
 * TODO: Clear or modify this feature when starting a new project.
 */

import {
  Box,
  Center,
  Heading,
  Text,
  HStack,
  VStack,
  ScreenWrapper,
  Button,
  ButtonText,
  Card,
} from "@repo/ui";
import { useRouter } from "solito/navigation";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../provider/auth-provider";

export function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  const currentYear = new Date().getFullYear();

  return (
    <ScreenWrapper>
      {/* Hero Section */}
      <Box className="bg-gradient-to-b from-primary/10 to-background border-b border-border">
        <VStack className="max-w-4xl w-full mx-auto px-6 py-20 text-center items-center">
          <Box className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20 mb-8 rotate-3">
            <Text size="3xl">🚀</Text>
          </Box>
          <Heading
            size="4xl"
            className="font-extrabold text-foreground tracking-tight mb-4"
          >
            Universal App Hub
          </Heading>
          <Text className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A high-performance monorepo boilerplate featuring Solito for unified
            routing and Gluestack UI for beautiful, cross-platform components.
          </Text>

          <HStack className="gap-4 flex-wrap justify-center">
            <Button
              size="xl"
              action="primary"
              className="rounded-full px-10 shadow-lg shadow-primary/30 active:scale-95 transition-transform"
              onPress={() => router.push(ROUTES.USER_HUB)}
            >
              <ButtonText className="font-bold text-lg">
                Explore User Hub
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Box>

      <VStack className="max-w-4xl w-full mx-auto px-6 py-12 gap-16">
        {/* User Session Section (Zustand Demo) */}
        <VStack className="gap-6">
          <Heading size="2xl" className="font-bold text-foreground">
            Authentication
          </Heading>
          <Card className="p-8 border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
            {isLoading ? (
              <VStack className="items-center gap-4 py-4">
                <Text className="text-muted-foreground text-lg">
                  Loading session...
                </Text>
              </VStack>
            ) : !isAuthenticated ? (
              <VStack className="items-center gap-6 py-4">
                <Text className="text-center text-muted-foreground text-lg">
                  No active session found. Sign in with your email and password.
                </Text>
                <Button
                  size="xl"
                  action="primary"
                  className="rounded-full px-10"
                  onPress={() => router.push(ROUTES.SIGN_IN)}
                >
                  <ButtonText className="font-bold">Sign In</ButtonText>
                </Button>
              </VStack>
            ) : (
              <HStack className="items-center justify-between gap-6 flex-wrap">
                <HStack className="gap-5 items-center">
                  <Box className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center border-2 border-primary/20">
                    <Text size="2xl">👤</Text>
                  </Box>
                  <VStack>
                    <Heading size="lg" className="text-foreground">
                      {user?.name}
                    </Heading>
                    <HStack className="gap-2 items-center">
                      <Text size="sm" className="text-muted-foreground">
                        {user?.email}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Button
                  variant="outline"
                  action="negative"
                  onPress={signOut}
                  className="rounded-full border-2"
                >
                  <ButtonText>Sign Out</ButtonText>
                </Button>
              </HStack>
            )}
          </Card>
        </VStack>

        {/* Tech Stack Explanation */}
        <VStack className="gap-8">
          <VStack className="gap-2">
            <Heading size="2xl" className="font-bold text-foreground">
              Project Architecture
            </Heading>
            <Text className="text-muted-foreground text-lg">
              Understanding the core pillars of this monorepo.
            </Text>
          </VStack>

          <Box className="grid md:grid-cols-2 gap-6">
            <StackCard
              title="Next.js v16"
              description="The world's leading React framework for the web, providing SSR, static site generation, and optimized performance."
              icon="🌐"
              color="bg-black"
            />
            <StackCard
              title="Expo v55"
              description="A powerful framework and platform for universal React applications, enabling seamless native development for iOS and Android."
              icon="📱"
              color="bg-blue-600"
            />
            <StackCard
              title="Solito v5"
              description="The essential glue between Next.js and Expo. It enables shared navigation and code-sharing across web and native platforms."
              icon="🔗"
              color="bg-blue-500"
            />
            <StackCard
              title="Gluestack UI v4"
              description="High-performance universal component library. Styled with NativeWind (Tailwind CSS) for consistent design across platforms."
              icon="🎨"
              color="bg-purple-500"
            />
            <StackCard
              title="Turborepo v2"
              description="Intelligent build system for JS/TS monorepos. Optimizes workflows with local/remote caching for blazing fast execution."
              icon="⚡"
              color="bg-orange-500"
            />
            <StackCard
              title="Zustand v5"
              description="Lightweight, fast, and scalable state management for client-side global state, with built-in persistence support."
              icon="🐻"
              color="bg-amber-600"
            />
            <StackCard
              title="TanStack Query v5"
              description="Powerful asynchronous state management, handling data fetching, caching, and synchronization with ease."
              icon="🛰️"
              color="bg-rose-500"
            />
          </Box>
        </VStack>
      </VStack>

      {/* Footer */}
      <Box className="border-t border-border mt-12 bg-muted/30">
        <Center className="max-w-4xl mx-auto px-6 py-10">
          <VStack className="gap-4 items-center">
            <Text className="text-muted-foreground font-medium">
              Solito • Next.js • Expo • Zustand • Gluestack
            </Text>
            <Text size="xs" className="text-muted-foreground/60">
              © {currentYear} Modern Monorepo Template
            </Text>
          </VStack>
        </Center>
      </Box>
    </ScreenWrapper>
  );
}

function StackCard({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
}) {
  return (
    <Card className="p-6 border border-border hover:border-primary/50 transition-colors">
      <VStack className="gap-4">
        <HStack className="items-center gap-3">
          <Box
            className={`${color} w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}
          >
            <Text className="text-white">{icon}</Text>
          </Box>
          <Heading size="md">{title}</Heading>
        </HStack>
        <Text className="text-muted-foreground leading-relaxed">
          {description}
        </Text>
      </VStack>
    </Card>
  );
}
