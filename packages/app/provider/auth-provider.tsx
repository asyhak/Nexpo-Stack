"use client";

import React, { createContext, useContext, useMemo } from "react";
import { authClient } from "../services/auth-client";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type AuthContextType = {
  user: AuthUser | null;
  session: Record<string, unknown> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error?: string } | undefined>;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ error?: string } | undefined>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();

  const user = (data?.user as AuthUser | undefined) ?? null;
  const session =
    (data?.session as Record<string, unknown> | undefined) ?? null;

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      session,
      isAuthenticated: !!user,
      isLoading: isPending,
      signIn: async (email: string, password: string) => {
        const result = await authClient.signIn.email({ email, password });
        if (result.error) {
          return { error: result.error.message || "Sign in failed" };
        }
        return undefined;
      },
      signUp: async (name: string, email: string, password: string) => {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (result.error) {
          return { error: result.error.message || "Sign up failed" };
        }
        return undefined;
      },
      signOut: async () => {
        await authClient.signOut();
      },
    }),
    [user, session, isPending],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
