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
import { useAuth } from "../../provider/auth-provider";
import { ROUTES } from "../../constants/routes";

export function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setError("");
      const result = await signUp(value.name, value.email, value.password);
      if (result?.error) {
        setError(result.error);
      } else {
        router.replace(ROUTES.HOME);
      }
    },
  });

  return (
    <ScreenWrapper withScrollView={false}>
      <Center className="flex-1 bg-background px-6">
        <Box className="w-full max-w-sm">
          <VStack className="gap-2 mb-8 items-center">
            <Box className="w-16 h-16 bg-primary rounded-2xl items-center justify-center mb-4">
              <Text size="3xl">📝</Text>
            </Box>
            <Heading size="2xl" className="text-foreground">
              Create Account
            </Heading>
            <Text className="text-muted-foreground">
              Sign up to get started
            </Text>
          </VStack>

          {error ? (
            <Box className="bg-destructive/10 p-3 rounded-xl mb-4">
              <Text className="text-destructive text-sm">{error}</Text>
            </Box>
          ) : null}

          <VStack className="gap-4">
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Name is required";
                  if (value.length < 2)
                    return "Name must be at least 2 characters";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <FormControl
                  isInvalid={field.state.meta.errors.length > 0}
                  isRequired
                >
                  <FormControlLabel>
                    <FormControlLabelText>Name</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputSlot>
                      <InputIcon
                        as={LucideIcons.User}
                        className="text-muted-foreground"
                      />
                    </InputSlot>
                    <InputField
                      placeholder="Enter your name"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      autoCapitalize="words"
                    />
                  </Input>
                  {field.state.meta.errors.length > 0 ? (
                    <FormControlError>
                      <FormControlErrorText>
                        {field.state.meta.errors[0]}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Email is required";
                  if (!/\S+@\S+\.\S+/.test(value))
                    return "Invalid email address";
                  return undefined;
                },
              }}
            >
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
                        {field.state.meta.errors[0]}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Password is required";
                  if (value.length < 8)
                    return "Password must be at least 8 characters";
                  return undefined;
                },
              }}
            >
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
                      placeholder="Create a password"
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
                        {field.state.meta.errors[0]}
                      </FormControlErrorText>
                    </FormControlError>
                  ) : null}
                </FormControl>
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{
                onChangeListenTo: ["password"],
                onChange: ({ value }) => {
                  if (!value) return "Please confirm your password";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <FormControl
                  isInvalid={field.state.meta.errors.length > 0}
                  isRequired
                >
                  <FormControlLabel>
                    <FormControlLabelText>
                      Confirm Password
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputSlot>
                      <InputIcon
                        as={LucideIcons.Lock}
                        className="text-muted-foreground"
                      />
                    </InputSlot>
                    <InputField
                      placeholder="Confirm your password"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <InputSlot
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <InputIcon
                        as={
                          showConfirmPassword
                            ? LucideIcons.EyeOff
                            : LucideIcons.Eye
                        }
                        className="text-muted-foreground"
                      />
                    </InputSlot>
                  </Input>
                  {field.state.meta.errors.length > 0 ? (
                    <FormControlError>
                      <FormControlErrorText>
                        {field.state.meta.errors[0]}
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
              <ButtonText className="font-semibold">Create Account</ButtonText>
            </Button>
          </VStack>

          <HStack space="xs" className="justify-center items-center mt-6">
            <Text className="text-muted-foreground">
              Already have an account?
            </Text>
            <Button variant="link" onPress={() => router.push(ROUTES.SIGN_IN)}>
              <ButtonText className="text-primary font-semibold">
                Sign In
              </ButtonText>
            </Button>
          </HStack>
        </Box>
      </Center>
    </ScreenWrapper>
  );
}
