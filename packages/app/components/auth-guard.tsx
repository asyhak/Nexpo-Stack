import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  Button,
  ButtonText,
  Spinner,
} from "@repo/ui";
import { useRouter } from "solito/navigation";
import { useAuth } from "../provider/auth-provider";
import { ROUTES } from "../constants/routes";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Reusable component to protect screens or sections that require authentication.
 * Handles:
 * 1. Loading State: Shows a spinner while checking the session.
 * 2. Unauthorized State: Shows a premium "Sign In" prompt.
 * 3. Authorized State: Renders the protected content.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <Center className="flex-1 p-6">
        <VStack className="items-center gap-4">
          <Spinner size="large" className="text-primary" />
          <Text className="text-muted-foreground animate-pulse">
            Verifying your session...
          </Text>
        </VStack>
      </Center>
    );
  }

  if (!isAuthenticated) {
    return (
      <Center className="flex-1 p-6">
        <Box className="max-w-md w-full bg-card/50 backdrop-blur-md border border-primary/10 rounded-3xl p-8 shadow-2xl shadow-primary/5">
          <VStack className="items-center gap-6">
            <Box className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
              <Text size="3xl">🔒</Text>
            </Box>

            <VStack className="items-center gap-2">
              <Heading
                size="xl"
                className="text-foreground font-bold text-center"
              >
                Sign In Required
              </Heading>
              <Text className="text-muted-foreground text-center leading-relaxed">
                You need to be authenticated to access this page. Please sign in
                or create an account to continue.
              </Text>
            </VStack>

            <VStack className="w-full gap-3">
              <Button
                size="lg"
                action="primary"
                className="rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                onPress={() => router.push(ROUTES.SIGN_IN)}
              >
                <ButtonText className="font-bold">Sign In</ButtonText>
              </Button>

              <Button variant="link" onPress={() => router.push(ROUTES.HOME)}>
                <ButtonText className="text-muted-foreground">
                  Return to Home
                </ButtonText>
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Center>
    );
  }

  return <>{children}</>;
}
