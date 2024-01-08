import { Box, Button, Center, Spinner, VStack } from "@chakra-ui/react";
import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { startNewQueue } from "../../utils";
import { shuffleArray } from "../../utils/shuffle";
import { usePlayerBar } from "../PlayerBar/PlayerBarContext";
import { TracksDisplay } from "../TracksDisplay";
import { useSearch } from "./useSearch";

export interface SearchResultsProps {
  searchFor: string;
}

export const SearchResults: FC<SearchResultsProps> = (props) => {
  const dispatch = useDispatch();
  const { allResults, status } = useSearch(props);
  const { scrollRef } = usePlayerBar();

  const handleShuffleAll = useCallback(() => {
    dispatch(startNewQueue({ newQueue: shuffleArray([...allResults]) }));
  }, [dispatch, allResults]);

  if (allResults.length === 0 && status !== "success") {
    return (
      <Center>
        <Spinner size="xl" mt={4} />
      </Center>
    );
  }

  return (
    <VStack spacing={4}>
      {allResults.length === 0 ? (
        <></>
      ) : (
        <Button onClick={handleShuffleAll}>
          Shuffle {status === "success" ? allResults.length : ""} results
        </Button>
      )}
      <Box width="100%">
        <TracksDisplay
          key={allResults.length}
          tracks={allResults}
          scrollRef={scrollRef}
        />
      </Box>
    </VStack>
  );
};
