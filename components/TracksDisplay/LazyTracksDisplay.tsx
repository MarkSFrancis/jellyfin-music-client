import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { BaseItemDtoQueryResult } from "@jellyfin/client-axios";
import React from "react";
import { FC, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { MutationState, Track } from "../../utils";
import { usePlayerBar } from "../PlayerBar";
import { TracksDisplay } from "./TracksDisplay";

export interface LazyTracksDisplayProps {
  tracks: Track[];
  getTracksPageState: MutationState<BaseItemDtoQueryResult>;
  onGetTracksPage: () => void;
  totalTracks: number | undefined;
}

export const LazyTracksDisplay: FC<LazyTracksDisplayProps> = (props) => {
  const { scrollRef } = usePlayerBar();

  const handleLoadMore = useCallback(
    async (continueOnError: boolean) => {
      if (
        (!continueOnError && props.getTracksPageState.status === "error") ||
        props.getTracksPageState.status === "loading"
      ) {
        return;
      }

      props.onGetTracksPage();
    },
    [props]
  );

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => handleLoadMore(false)}
        hasMore={
          (props.getTracksPageState.status === "success" &&
            props.tracks.length < props.totalTracks) ||
          props.getTracksPageState.status === "idle"
        }
        loader={
          <Center>
            <Spinner />
          </Center>
        }
        useWindow={false}
        getScrollParent={() => scrollRef.current}
      >
        <TracksDisplay key="song-list" tracks={props.tracks} />
      </InfiniteScroll>
      {props.getTracksPageState.status === "error" && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Failed to fetch media!</AlertTitle>
          <AlertDescription>
            <Button variant="link" onClick={() => handleLoadMore(true)}>
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
