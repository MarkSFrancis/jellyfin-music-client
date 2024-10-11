import React, { useState } from 'react';
import { FC, useCallback } from 'react';
import { Track, useGetTracks } from '../../utils';
import { LazyDisplay } from '../LazyDisplay/LazyDisplay';
import { usePlayerBar } from '../PlayerBar/PlayerBarContext';
import { TracksDisplay } from './TracksDisplay';
import { ItemsApiGetItemsRequest } from '@jellyfin/sdk/lib/generated-client/api/items-api';

export const DEFAULT_LIBRARY_PAGE_SIZE = 100;

export interface LibraryTracksProps
  extends Omit<ItemsApiGetItemsRequest, 'limit' | 'startIndex'> {
  pageSize?: number;
}

export const LibraryTracks: FC<LibraryTracksProps> = ({
  pageSize,
  ...searchProps
}) => {
  const [getTracksPage, getTracksPageState] = useGetTracks();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [totalTracks, setTotalTracks] = useState<number>();
  const { scrollRef } = usePlayerBar();

  const handleLoadMore = useCallback(async () => {
    const nextPage = await getTracksPage({
      ...searchProps,
      limit: pageSize || DEFAULT_LIBRARY_PAGE_SIZE,
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
