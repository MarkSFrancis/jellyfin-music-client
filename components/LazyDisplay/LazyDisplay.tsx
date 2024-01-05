import { Center, Spinner } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { FC, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { MutationState } from "../../utils";
import { usePlayerBar } from "../PlayerBar";

export interface LazyDisplayProps extends PropsWithChildren {
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

  const hasMore =
    (props.getPageStatus === "success" &&
      props.loadedCount < props.totalItems) ||
    props.getPageStatus === "idle";

  if (props.loadedCount === 0 && props.getPageStatus === "loading") {
    handleLoadMore(false);
    return <Loader />;
  }

  return (
    // @ts-expect-error Does not support React v18 types https://github.com/danbovey/react-infinite-scroller/issues/307
    <InfiniteScroll
      pageStart={0}
      loadMore={() => handleLoadMore(false)}
      hasMore={hasMore}
      loader={<Loader />}
      useWindow={false}
      getScrollParent={() =>
        props.scrollRef ? props.scrollRef.current : playerScrollRef.current
      }
    >
      {props.children}
    </InfiniteScroll>
  );
};

const Loader = () => {
  return (
    <Center>
      <Spinner size="xl" mt={4} />
    </Center>
  );
};
