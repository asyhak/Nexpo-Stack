import React from "react";
import { Card } from "../../ui/card";
import { Heading } from "../../ui/heading";
import { VStack } from "../../ui/vstack";
import { HStack } from "../../ui/hstack";
import { Button, ButtonText, ButtonIcon } from "../../ui/button";
import { Box } from "../../ui/box";
import { Text } from "../../ui/text";
import { StarIcon } from "../../ui/icon";

/**
 * EXAMPLE: User Card component
 * TODO: Remove this file when starting a new project.
 */

interface ExampleUserCardProps {
  name: string;
  email: string;
  username: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ExampleUserCard = ({
  name,
  email,
  username,
  isFavorite,
  onToggleFavorite,
}: ExampleUserCardProps) => {
  return (
    <Card size="md" variant="elevated" className="m-2 p-4">
      <HStack className="justify-between items-center">
        <VStack className="flex-1">
          <Heading size="md" className="mb-1">
            {name}
          </Heading>
          <Text size="sm" className="text-muted-foreground mb-1">
            @{username}
          </Text>
          <Text size="xs" className="text-muted-foreground">
            {email}
          </Text>
        </VStack>
        <Box>
          <Button
            size="sm"
            variant={isFavorite ? "solid" : "outline"}
            action={isFavorite ? "primary" : "secondary"}
            onPress={onToggleFavorite}
          >
            <ButtonIcon as={StarIcon} size="sm" />
            <ButtonText>{isFavorite ? "Favorited" : "Favorite"}</ButtonText>
          </Button>
        </Box>
      </HStack>
    </Card>
  );
};
