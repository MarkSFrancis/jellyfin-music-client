import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useGetTracks, Track } from "../../utils";
import { usePlayerBar } from "../PlayerBar";
import {
  DEFAULT_LIBRARY_PAGE_SIZE,
  LazyDisplay,
  TracksDisplay,
} from "../TracksDisplay";

export interface SearchResultsProps {
  searchFor: string;
}

export const SearchResults: FC<SearchResultsProps> = (props) => {
  const [getTracksPage, getTracksPageState] = useGetTracks();
  const [titleMatches, setTitleMatches] = useState<Track[]>([]);
  const [totalTitleMatches, setTotalTitleMatches] = useState<number>(undefined);

  const [artistMatches, setArtistMatches] = useState<Track[]>([]);
  const [totalArtistMatches, setTotalArtistMatches] =
    useState<number>(undefined);

  const [tracks, duplicatesCount] = useMemo(() => {
    const merged = [...titleMatches, ...artistMatches];
    const distinct = merged.filter(
      (t, i) => merged.findIndex((tm) => tm.Id === t.Id) === i
    );

    return [distinct, merged.length - distinct.length] as const;
  }, [titleMatches, artistMatches]);

  const totalTracks = useMemo(() => {
    if (totalTitleMatches === undefined || totalArtistMatches === undefined)
      return undefined;

    return totalTitleMatches + totalArtistMatches - duplicatesCount;
  }, [totalTitleMatches, totalArtistMatches, duplicatesCount]);

  const { scrollRef } = usePlayerBar();

  const handleLoadMore = useCallback(async () => {
    if (titleMatches.length !== totalTitleMatches) {
      const nextTitlesPage = await getTracksPage({
        searchTerm: props.searchFor,
        limit: DEFAULT_LIBRARY_PAGE_SIZE,
        startIndex: titleMatches.length,
      });

      setTitleMatches((m) => [...m, ...nextTitlesPage.tracks]);
      setTotalTitleMatches(nextTitlesPage.totalTracks);
    }

    if (artistMatches.length !== totalArtistMatches) {
      const nextArtistsPage = await getTracksPage({
        artists: [props.searchFor],
        limit: DEFAULT_LIBRARY_PAGE_SIZE,
        startIndex: artistMatches.length,
      });

      setArtistMatches((m) => [...m, ...nextArtistsPage.tracks]);
      setTotalArtistMatches(nextArtistsPage.totalTracks);
    }
  }, [
    getTracksPage,
    totalArtistMatches,
    totalTitleMatches,
    artistMatches,
    titleMatches,
    props.searchFor,
  ]);

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
