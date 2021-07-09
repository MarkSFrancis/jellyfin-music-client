import { ItemFields, ItemsApiGetItemsRequest } from "@jellyfin/client-axios";
import { useCallback } from "react";
import { useQuery } from ".";
import { useMusicLibraryConfig } from "../../components/Jellyfin";
import { useUser } from "../../components/Jellyfin/User/UserContext";
import { Track } from "../trackTypes";
import { useMutation } from "./jellyfin";

export const useMusicLibraryQuery = (options: ItemsApiGetItemsRequest = {}) => {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();

  return useQuery("items", "getItems", [
    {
      ...getDefaultOptions(user.Id, musicLibrary.id),
      ...options,
    },
  ]);
};

export const useMusicLibraryFetch = () => {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();

  const [fetch, state] = useMutation("items", "getItems");

  const fetchWithDefaults = useCallback(
    async (options: ItemsApiGetItemsRequest = {}) => {
      const result = await fetch([
        {
          ...getDefaultOptions(user.Id, musicLibrary.id),
          ...options,
        },
      ]);

      return result.data.Items as Track[];
    },
    [user, musicLibrary, fetch]
  );

  return [fetchWithDefaults, state] as const;
};

const getDefaultOptions = (
  userId: string,
  libraryId: string
): ItemsApiGetItemsRequest => ({
  userId: userId,
  recursive: true,
  parentId: libraryId,
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
});
