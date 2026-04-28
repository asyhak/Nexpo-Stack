"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "solito/navigation";
import {
  Box,
  Center,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  ButtonText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  ScreenWrapper,
  LucideIcons,
} from "@repo/ui";
import { SignInSchema } from "@repo/schema";
import { useAuth } from "../../provider/auth-provider";
import { ROUTES } from "../../constants/routes";

export function SignInScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: {
      onChange: SignInSchema,
    },
    onSubmit: async ({ value }) => {
      setError("");
      const result = await signIn(value.email, value.password);
      if (result?.error) {
        setError(result.error);
      } else {
        router.replace(ROUTES.HOME);
      }
    },
  });

  return (
    <ScreenWrapper
      withScrollView={true}
      withKeyboardAvoidingView={true}
      contentContainerClassName="flex-grow justify-center px-6"
    >
      <Center className="bg-background">
        <Box className="w-full max-w-sm">
          <VStack className="gap-2 mb-8 items-center">
            <Box className="w-16 h-16 bg-primary rounded-2xl items-center justify-center mb-4">
              <Text size="3xl">🔐</Text>
            </Box>
            <Heading size="2xl" className="text-foreground">
              Welcome Back
            </Heading>
            <Text className="text-muted-foreground">
              Sign in to your account
            </Text>
          </VStack>

          {error ? (
            <Box className="bg-destructive/10 p-3 rounded-xl mb-4">
              <Text className="text-destructive text-sm">{error}</Text>
            </Box>
          ) : null}

          <VStack className="gap-4">
            <form.Field name="email">
              {(field) => (
                <FormControl
                  isInvalid={field.state.meta.errors.length > 0}
                  isRequired
                >
                  <FormControlLabel>
                    <FormControlLabelText>Email</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputSlot>
                      <InputIcon
                        as={LucideIcons.Mail}
                        className="text-muted-foreground"
                      />
                    </InputSlot>
                    <InputField
                      placeholder="Enter your email"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </Input>
                  {field.state.meta.errors.length > 0 ? (
                    <FormControlError>
                      <FormControlErrorText>
                        {String(
                          field.state.meta.errors[0]?.message ??
                            field.state.meta.errors[0] ??
                            "",
                        )}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <FormControl
                  isInvalid={field.state.meta.errors.length > 0}
                  isRequired
                >
                  <FormControlLabel>
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputSlot>
                      <InputIcon
                        as={LucideIcons.Lock}
                        className="text-muted-foreground"
                      />
                    </InputSlot>
                    <InputField
                      placeholder="Enter your password"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      secureTextEntry={!showPassword}
                    />
                    <InputSlot onPress={() => setShowPassword(!showPassword)}>
                      <InputIcon
                        as={showPassword ? LucideIcons.EyeOff : LucideIcons.Eye}
                        className="text-muted-foreground"
                      />
                    </InputSlot>
                  </Input>
                  {field.state.meta.errors.length > 0 ? (
                    <FormControlError>
                      <FormControlErrorText>
                        {String(
                          field.state.meta.errors[0]?.message ??
                            field.state.meta.errors[0] ??
                            "",
                        )}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>
              )}
            </form.Field>

            <Button
              size="lg"
              action="primary"
              className="rounded-xl mt-2"
              onPress={form.handleSubmit}
            >
              <ButtonText className="font-semibold">Sign In</ButtonText>
            </Button>
          </VStack>

          <HStack space="xs" className="justify-center items-center mt-6">
            <Text className="text-muted-foreground">
              Don't have an account?
            </Text>
            <Button variant="link" onPress={() => router.push(ROUTES.SIGN_UP)}>
              <ButtonText className="text-primary font-semibold">
                Sign Up
              </ButtonText>
            </Button>
          </HStack>
        </Box>
      </Center>
    </ScreenWrapper>
  );
}
