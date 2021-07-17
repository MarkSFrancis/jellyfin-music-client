import React, { useState } from "react";
import { FC, useCallback } from "react";
import { Track, useGetTracks } from "../../utils";
import { LazyTracksDisplay } from "./LazyTracksDisplay";

export interface LibraryTracksProps {
  sortBy: string;
  sortOrder: string;
  pageSize?: number;
}

export const LibraryTracks: FC<LibraryTracksProps> = (props) => {
  const [getTracksPage, getTracksPageState] = useGetTracks();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [totalTracks, setTotalTracks] = useState<number>(undefined);

  const handleLoadMore = useCallback(async () => {
    const pageSize = props.pageSize || 100;
    const nextPage = await getTracksPage({
      limit: pageSize,
      sortBy: props.sortBy,
      sortOrder: props.sortOrder,
      startIndex: tracks.length,
    });

    setTracks((s) => [...s, ...nextPage.tracks]);
    setTotalTracks(nextPage.totalTracks);
  }, [getTracksPage, tracks, props]);

  return (
    <LazyTracksDisplay
      tracks={tracks}
      getTracksPageState={getTracksPageState}
      totalTracks={totalTracks}
      onGetTracksPage={handleLoadMore}
    />
  );
};
