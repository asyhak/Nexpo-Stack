import React, { useState, useEffect } from "react";
import {
  ScrollView,
  ViewProps,
  KeyboardAvoidingViewProps,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";
import { SafeAreaView, Edge, useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../../ui/box";
import { KeyboardAvoidingView } from "../../ui/keyboard-avoiding-view";

interface IScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  edges?: Edge[];
  className?: string;
  contentContainerClassName?: string;
  withScrollView?: boolean;
  withKeyboardAvoidingView?: boolean;
  keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
  keyboardVerticalOffset?: number;
}

export const ScreenWrapper = ({
  children,
  edges = ["top", "left", "right"],
  className,
  contentContainerClassName,
  withScrollView = true,
  withKeyboardAvoidingView = false,
  keyboardAvoidingViewProps,
  keyboardVerticalOffset,
  ...props
}: IScreenWrapperProps) => {
  const insets = useSafeAreaInsets();
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const onShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardOpen(true),
    );
    const onHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardOpen(false),
    );
    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, []);

  const container = `flex-1 bg-background ${className || ""}`;
  const center = withScrollView && keyboardOpen ? "" : "justify-center";
  const offset = keyboardVerticalOffset ?? (Platform.OS === "ios" ? insets.top : 0);

  const inner = withScrollView ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName={`flex-grow ${contentContainerClassName || ""}`}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable className={`flex-1 ${center}`} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    </ScrollView>
  ) : (
    <Pressable className={`flex-1 ${center}`} onPress={Keyboard.dismiss}>
      <Box className={`flex-1 ${contentContainerClassName || ""}`}>{children}</Box>
    </Pressable>
  );

  const content =
    withKeyboardAvoidingView && Platform.OS === "ios" ? (
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
        keyboardVerticalOffset={offset}
        {...keyboardAvoidingViewProps}
      >
        {inner}
      </KeyboardAvoidingView>
    ) : (
      inner
    );

  return (
    <SafeAreaView className={container} edges={edges} {...props}>
      {content}
    </SafeAreaView>
  );
};
