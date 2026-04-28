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

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, () => setIsKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener(hideEvent, () => setIsKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const containerClass = `flex-1 bg-background ${className || ""}`;

  const centerClass = withScrollView && isKeyboardVisible ? "" : "justify-center";

  let content = withScrollView ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName={`flex-grow ${contentContainerClassName || ""}`}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable
        className={`flex-1 ${centerClass}`}
        onPress={Keyboard.dismiss}
      >
        {children}
      </Pressable>
    </ScrollView>
  ) : (
    <Pressable
      className={`flex-1 ${centerClass}`}
      onPress={Keyboard.dismiss}
    >
      <Box className={`flex-1 ${contentContainerClassName || ""}`}>
        {children}
      </Box>
    </Pressable>
  );

  const offset = keyboardVerticalOffset ?? (Platform.OS === "ios" ? insets.top : 0);

  const wrappedContent =
    withKeyboardAvoidingView && Platform.OS === "ios" ? (
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1"
        keyboardVerticalOffset={offset}
        {...keyboardAvoidingViewProps}
      >
        {content}
      </KeyboardAvoidingView>
    ) : (
      content
    );

  return (
    <SafeAreaView className={containerClass} edges={edges} {...props}>
      {wrappedContent}
    </SafeAreaView>
  );
};
