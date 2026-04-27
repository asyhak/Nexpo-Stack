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
    <Box className={`flex-1 bg-background ${className || ""}`}>
      <Box className={`min-h-screen ${contentContainerClassName || ""}`}>
        {children}
      </Box>
    </Box>
  );
};
