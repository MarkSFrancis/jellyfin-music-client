import React, { useState } from "react";
import { FC, useCallback } from "react";
import { Track, useGetTracks } from "../../utils";
import { LazyDisplay } from "../LazyDisplay/LazyDisplay";
import { TracksDisplay } from "./TracksDisplay";

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
    <LazyDisplay
      loadedCount={tracks.length}
      getPageStatus={getTracksPageState.status}
      totalItems={totalTracks}
      onGetPage={handleLoadMore}
    >
      <TracksDisplay tracks={tracks} />
    </LazyDisplay>
  );
};
