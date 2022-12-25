import { ItemFields } from "@jellyfin/client-axios";
import { useEffect, useMemo } from "react";
import { Track, useMutation, useQuery, useSafeState } from "../../utils";
import { useMusicLibraryConfig } from "../Jellyfin";
import { useUser } from "../Jellyfin/User/UserContext";

export interface UseSearchProps {
  searchFor: string;
}

export const useSearch = (props: UseSearchProps) => {
  const { results: titleMatches, state: titleSearchState } =
    useTrackTitleSearch(props);
  const { results: artistMatches, state: artistSearchState } =
    useSearchTracksByArtist(props);

  const allResults = useMemo(() => {
    const results: Track[] = [];
    if (titleSearchState.status === "success") {
      results.push(...titleMatches);
    }
    if (artistSearchState.status === "success") {
      results.push(...artistMatches);
    }

    return results;
  }, [titleSearchState, titleMatches, artistSearchState, artistMatches]);

  const state = useMemo(() => {
    if (titleSearchState.status !== "success") {
      return titleSearchState;
    }

    return artistSearchState;
  }, [titleSearchState, artistSearchState]);

  return {
    allResults,
    state,
  };
};

export const useTrackTitleSearch = (props: UseSearchProps) => {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();

  const [results] = useQuery("items", "getItems", [
    {
      userId: user.Id,
      recursive: true,
      parentId: musicLibrary.id,
      fields: [
        ItemFields.CanDelete,
        ItemFields.CanDownload,
        ItemFields.CustomRating,
        ItemFields.DateCreated,
        ItemFields.Etag,
        ItemFields.Genres,
        ItemFields.MediaSources,
        ItemFields.Path,
        ItemFields.Tags,
        ItemFields.MediaStreams,
      ],
      searchTerm: props.searchFor,
    },
  ]);

  return {
    state: results,
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

  useEffect(() => {
    if (getArtists.status !== "success") {
      return;
    }

    (async () => {
      const artistIds =
        getArtists.data.Items?.map((a) => a.Id).filter((a) => !!a) ?? [];

      if (artistIds.length === 0) {
        setTracks([]);
      } else {
        const result = await getTracks([
          {
            parentId: musicLibrary.id,
            userId: user.Id,
            artistIds: artistIds,
            recursive: true,
            fields: [
              ItemFields.CanDelete,
              ItemFields.CanDownload,
              ItemFields.CustomRating,
              ItemFields.DateCreated,
              ItemFields.Etag,
              ItemFields.Genres,
              ItemFields.MediaSources,
              ItemFields.Path,
              ItemFields.Tags,
              ItemFields.MediaStreams,
            ],
          },
        ]);

        setTracks(result.data.Items as Track[]);
      }
    })();
  }, [getTracks, user, setTracks, musicLibrary, getArtists]);

  return {
    results: tracks,
    state: getTracksState,
  };
};
