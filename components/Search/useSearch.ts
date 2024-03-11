import { useEffect, useMemo } from "react";
import {
  Track,
  getTracksFromLibaryDefaultOptions,
  useMutation,
  useQuery,
  useSafeState,
} from "../../utils";
import { useMusicLibraryConfig } from "../Jellyfin/MusicLibrary/MusicLibraryConfig";
import { useUser } from "../Jellyfin/User/UserContext";

export interface UseSearchProps {
  searchFor: string;
}

export const useSearch = (props: UseSearchProps) => {
  const { results: titleMatches, status: titleSearchState } =
    useTrackTitleSearch(props);
  const { results: artistMatches, status: artistSearchState } =
    useSearchTracksByArtist(props);
  const { results: genreMatches, status: genreSearchState } =
    useSearchTracksByGenre(props);

  const allResults = useMemo(() => {
    let results: Track[] = [];
    if (titleSearchState === "success") {
      results.push(...titleMatches);
    }
    if (artistSearchState === "success") {
      results.push(...artistMatches);
    }
    if (genreSearchState === "success") {
      results.push(...genreMatches);
    }

    results = results.filter((r, rIdx) => {
      const firstOcurrenceIndex = results.findIndex((r2) => r2.Id === r.Id);
      return firstOcurrenceIndex === rIdx;
    });

    return results;
  }, [
    titleSearchState,
    titleMatches,
    artistSearchState,
    artistMatches,
    genreSearchState,
    genreMatches,
  ]);

  const status = useMemo(() => {
    if (titleSearchState !== "success") {
      return titleSearchState;
    }

    if (artistSearchState !== "success") {
      return artistSearchState;
    }

    return genreSearchState;
  }, [titleSearchState, artistSearchState, genreSearchState]);

  return {
    allResults,
    status,
  };
};

export const useTrackTitleSearch = (props: UseSearchProps) => {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();

  const [results] = useQuery("items", "getItems", [
    {
      ...getTracksFromLibaryDefaultOptions(user.Id, musicLibrary.id),
      searchTerm: props.searchFor,
    },
  ]);

  return {
    status: results.status,
    results: results.data?.Items as Track[] | undefined,
  };
};

export const useSearchTracksByArtist = (props: UseSearchProps) => {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();
  const [getArtists] = useQuery("artists", "getArtists", [
    {
      searchTerm: props.searchFor,
      userId: user.Id,
      parentId: musicLibrary.id,
    },
  ]);

  const [getTracks, getTracksState] = useMutation("items", "getItems");
  const [tracks, setTracks] = useSafeState<Track[]>([]);
  const [emptyResults, setEmptyResults] = useSafeState(false);

  useEffect(() => {
    if (getArtists.status !== "success") {
      return;
    }

    (async () => {
      const artistIds =
        getArtists.data.Items?.map((a) => a.Id).filter((a) => !!a) ?? [];

      if (artistIds.length === 0) {
        setEmptyResults(true);
        setTracks([]);
      } else {
        const result = await getTracks([
          {
            ...getTracksFromLibaryDefaultOptions(user.Id, musicLibrary.id),
            artistIds: artistIds,
          },
        ]);

        setTracks(result.data.Items as Track[]);
      }
    })();
  }, [getTracks, user, setTracks, musicLibrary, getArtists, setEmptyResults]);

  return {
    results: tracks,
    status: emptyResults ? "success" : getTracksState.status,
  };
};

export const useSearchTracksByGenre = (props: UseSearchProps) => {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();
  const [getGenres] = useQuery("musicGenres", "getMusicGenres", [
    {
      searchTerm: props.searchFor,
      userId: user.Id,
      parentId: musicLibrary.id,
    },
  ]);

  const [emptyResults, setEmptyResults] = useSafeState(false);
  const [getTracks, getTracksState] = useMutation("items", "getItems");
  const [tracks, setTracks] = useSafeState<Track[]>([]);

  useEffect(() => {
    if (getGenres.status !== "success") {
      return;
    }

    (async () => {
      const genreIds =
        getGenres.data.Items?.map((a) => a.Id).filter((a) => !!a) ?? [];

      if (genreIds.length === 0) {
        setEmptyResults(true);
        setTracks([]);
      } else {
        const result = await getTracks([
          {
            ...getTracksFromLibaryDefaultOptions(user.Id, musicLibrary.id),
            genreIds: genreIds,
          },
        ]);

        setTracks(result.data.Items as Track[]);
      }
    })();
  }, [getTracks, user, setTracks, musicLibrary, getGenres, setEmptyResults]);

  return {
    results: tracks,
    status: emptyResults ? "success" : getTracksState.status,
  };
};
