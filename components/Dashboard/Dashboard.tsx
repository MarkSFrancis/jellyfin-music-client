import { Box, Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { PropsWithChildren, useCallback } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { startNewQueue, useGetTracks } from "../../utils";
import { Logo } from "../Layout/Logo";
import { LibraryTracks } from "../TracksDisplay";
import {
  ItemFields,
  SortOrder,
} from "@jellyfin/sdk/lib/generated-client/models";

export const Dashboard: FC<PropsWithChildren> = () => {
  const dispatch = useDispatch();
  const [getTracks, getTracksState] = useGetTracks();

  const handlePlayMostRecent = useCallback(async () => {
    const library = await getTracks({
      limit: 300,
      sortBy: [ItemFields.DateCreated],
      sortOrder: [SortOrder.Descending],
    });
    dispatch(startNewQueue({ newQueue: library.tracks }));
  }, [getTracks, dispatch]);

  const handleShuffleAll = useCallback(async () => {
    const library = await getTracks({
      limit: 300,
      sortBy: ["Random"],
    });
    dispatch(startNewQueue({ newQueue: library.tracks }));
  }, [getTracks, dispatch]);

  return (
    <VStack spacing={4}>
      <Heading>
        <Logo width="100px" height="100px" />
      </Heading>
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
      <Box width="100%">
        <LibraryTracks
          sortBy={[ItemFields.DateCreated]}
          sortOrder={[SortOrder.Descending]}
        />
      </Box>
    </VStack>
  );
};
