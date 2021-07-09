import { Box, Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { ItemFields } from "@jellyfin/client-axios";
import { useCallback } from "react";
import { FC } from "react";
import { useMusicLibraryFetch } from "../../utils";
import { usePlayerCommands } from "../../utils";

export const Dashboard: FC = () => {
  const { startNewQueue } = usePlayerCommands();
  const [fetchLibrary, fetchLibraryState] = useMusicLibraryFetch();

  const handlePlayMostRecent = useCallback(async () => {
    const library = await fetchLibrary({
      limit: 300,
      sortBy: ItemFields.DateCreated,
      sortOrder: "Descending",
    });
    startNewQueue(library);
  }, [fetchLibrary, startNewQueue]);

  const handleShuffleAll = useCallback(async () => {
    const library = await fetchLibrary({
      limit: 300,
      sortBy: "Random",
    });
    startNewQueue(library);
  }, [fetchLibrary, startNewQueue]);

  return (
    <VStack spacing={4}>
      <Heading>Jellyfin Music</Heading>
      <Box>
        <ButtonGroup spacing={4}>
          <Button
            isLoading={fetchLibraryState.status === "loading"}
            onClick={handlePlayMostRecent}
          >
            Play most recent
          </Button>
          <Button
            isLoading={fetchLibraryState.status === "loading"}
            onClick={handleShuffleAll}
          >
            Shuffle all
          </Button>
        </ButtonGroup>
      </Box>
    </VStack>
  );
};
