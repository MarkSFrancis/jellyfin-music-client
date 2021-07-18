import { ItemsApiGetItemsRequest } from "@jellyfin/client-axios";
import React, { useState } from "react";
import { FC, useCallback } from "react";
import { Track, useGetTracks } from "../../utils";
import { LazyDisplay } from "../LazyDisplay/LazyDisplay";
import { usePlayerBar } from "../PlayerBar";
import { TracksDisplay } from "./TracksDisplay";

export interface LibraryTracksProps
  extends Omit<ItemsApiGetItemsRequest, "limit" | "startIndex"> {
  pageSize?: number;
}

export const LibraryTracks: FC<LibraryTracksProps> = ({
  pageSize,
  ...searchProps
}) => {
  const [getTracksPage, getTracksPageState] = useGetTracks();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [totalTracks, setTotalTracks] = useState<number>(undefined);
  const { scrollRef } = usePlayerBar();

  const handleLoadMore = useCallback(async () => {
    const nextPage = await getTracksPage({
      ...searchProps,
      limit: pageSize || 100,
      startIndex: tracks.length,
    });

    setTracks((s) => [...s, ...nextPage.tracks]);
    setTotalTracks(nextPage.totalTracks);
  }, [getTracksPage, tracks, pageSize, searchProps]);

  return (
    <LazyDisplay
      loadedCount={tracks.length}
      getPageStatus={getTracksPageState.status}
      totalItems={totalTracks}
      onGetPage={handleLoadMore}
      scrollRef={scrollRef}
    >
      <TracksDisplay key="tracks" tracks={tracks} scrollRef={scrollRef} />
    </LazyDisplay>
  );
};
