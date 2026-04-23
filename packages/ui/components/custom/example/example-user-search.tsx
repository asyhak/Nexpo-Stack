import React from "react";
import { Box } from "../../ui/box";
import { Input, InputField, InputIcon, InputSlot } from "../../ui/input";
import { SearchIcon } from "../../ui/icon";

/**
 * EXAMPLE: User Search component
 * TODO: Remove this file when starting a new project.
 */

interface ExampleUserSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const ExampleUserSearch = ({
  value,
  onChangeText,
  placeholder = "Search users...",
}: ExampleUserSearchProps) => {
  return (
    <Box className="px-4 py-2">
      <Input className="bg-secondary rounded-xl px-4 border-border focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all shadow-sm">
        <InputSlot>
          <InputIcon as={SearchIcon} className="text-muted-foreground" />
        </InputSlot>
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          className="web:outline-none"
        />
      </Input>
    </Box>
  );
};
