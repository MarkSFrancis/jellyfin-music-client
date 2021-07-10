import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FC, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Track, useGetTracks } from "../../utils";
import { SongListView } from "./SongListView";

export interface SongListProps {
  sortBy: string;
  sortOrder: string;
  pageSize?: number;
}

export const SongList: FC<SongListProps> = (props) => {
  const [getTracks, getTracksState] = useGetTracks();
  const [loadedSongs, setLoadedSongs] = useState<Track[]>([]);
  const [totalSongs, setTotalSongs] = useState(0);

  const handleLoadMore = useCallback(
    async (continueOnError: boolean) => {
      if (
        (!continueOnError && getTracksState.status === "error") ||
        getTracksState.status === "loading"
      ) {
        return;
      }

      const pageSize = props.pageSize || 100;
      const nextPage = await getTracks({
        limit: pageSize,
        sortBy: props.sortBy,
        sortOrder: props.sortOrder,
        startIndex: loadedSongs.length,
      });

      setLoadedSongs((s) => [...s, ...nextPage.tracks]);
      setTotalSongs(nextPage.totalTracks);
    },
    [getTracksState, getTracks, loadedSongs, props]
  );

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => handleLoadMore(false)}
      hasMore={
        getTracksState.status === "idle" || loadedSongs.length < totalSongs
      }
      loader={
        <Center>
          <Spinner />
        </Center>
      }
    >
      <SongListView tracks={loadedSongs} />
      {getTracksState.status === "error" && (
        <Alert key="error" status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Failed to fetch media!</AlertTitle>
          <AlertDescription>
            <Button variant="link" onClick={() => handleLoadMore(true)}>
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </InfiniteScroll>
  );
};
