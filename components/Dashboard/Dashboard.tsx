import { Box, Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { ItemFields } from "@jellyfin/client-axios";
import { useCallback } from "react";
import { FC } from "react";
import { useGetTracks } from "../../utils";
import { usePlayerCommands } from "../../utils";
import { useApi } from "../Jellyfin";
import { SongList } from "../SongList";

export const Dashboard: FC = () => {
  const { startNewQueue } = usePlayerCommands();
  const [getTracks, getTracksState] = useGetTracks();
  const { auth } = useApi();

  const handlePlayMostRecent = useCallback(async () => {
    const library = await getTracks({
      limit: 300,
      sortBy: ItemFields.DateCreated,
      sortOrder: "Descending",
    });
    startNewQueue(library.tracks);
  }, [getTracks, startNewQueue]);

  const handleShuffleAll = useCallback(async () => {
    const library = await getTracks({
      limit: 300,
      sortBy: "Random",
    });
    startNewQueue(library.tracks);
  }, [getTracks, startNewQueue]);

  return (
    <VStack spacing={4}>
      <Heading>Jellyfin Music</Heading>
      <Box>
        <ButtonGroup spacing={4}>
          <Button
            isLoading={getTracksState.status === "loading"}
            onClick={handlePlayMostRecent}
          >
            Play most recent
          </Button>
          <Button
            isLoading={getTracksState.status === "loading"}
            onClick={handleShuffleAll}
          >
            Shuffle all
          </Button>
        </ButtonGroup>
      </Box>
      <Box>
        <SongList sortBy={ItemFields.DateCreated} sortOrder="Descending" />
      </Box>
    </VStack>
  );
};
