import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { FC, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { MutationState } from "../../utils";
import { usePlayerBar } from "../PlayerBar";

export interface LazyDisplayProps {
  loadedCount: number;
  getPageStatus: MutationState<unknown>["status"];
  onGetPage: () => void;
  totalItems: number | undefined;
  scrollRef?: React.MutableRefObject<HTMLElement>;
}

export const LazyDisplay: FC<LazyDisplayProps> = (props) => {
  const { scrollRef: playerScrollRef } = usePlayerBar();

  const handleLoadMore = useCallback(
    async (continueOnError: boolean) => {
      if (
        (!continueOnError && props.getPageStatus === "error") ||
        props.getPageStatus === "loading"
      ) {
        return;
      }

      props.onGetPage();
    },
    [props]
  );

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => handleLoadMore(false)}
        hasMore={
          props.loadedCount < 200 &&
          ((props.getPageStatus === "success" &&
            props.loadedCount < props.totalItems) ||
            props.getPageStatus === "idle")
        }
        loader={
          <Center>
            <Spinner />
          </Center>
        }
        useWindow={false}
        getScrollParent={() =>
          props.scrollRef ? props.scrollRef.current : playerScrollRef.current
        }
      >
        {props.children}
      </InfiniteScroll>
      {props.getPageStatus === "error" && (
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
