import React from "react";
import { ScrollView, ViewProps } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import { Box } from "../../ui/box";

interface IScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  edges?: Edge[];
  className?: string;
  contentContainerClassName?: string;
  withScrollView?: boolean;
}

export const ScreenWrapper = ({
  children,
  edges = ["top", "left", "right"],
  className,
  contentContainerClassName,
  withScrollView = true,
  ...props
}: IScreenWrapperProps) => {
  const containerClass = `flex-1 bg-background ${className || ""}`;

  if (withScrollView) {
    return (
      <SafeAreaView className={containerClass} edges={edges} {...props}>
        <ScrollView
          className="flex-1"
          contentContainerClassName={contentContainerClassName || ""}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={containerClass} edges={edges} {...props}>
      <Box className={`flex-1 ${contentContainerClassName || ""}`}>
        {children}
      </Box>
    </SafeAreaView>
  );
};
