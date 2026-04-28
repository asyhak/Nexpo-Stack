import React from "react";
import { Box } from "../../ui/box";

interface IScreenWrapperProps {
  children: React.ReactNode;
  edges?: any[];
  className?: string;
  contentContainerClassName?: string;
  withScrollView?: boolean;
}

export const ScreenWrapper = ({
  children,
  className,
  contentContainerClassName,
}: IScreenWrapperProps) => {
  return (
    <Box className={`flex flex-1 flex-col bg-background ${className || ""}`}>
      <Box className={`min-h-screen flex flex-col py-4 md:py-8 ${contentContainerClassName || ""}`}>
        {children}
      </Box>
    </Box>
  );
};
