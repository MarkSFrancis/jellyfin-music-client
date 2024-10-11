import { useCallback } from 'react';
import { useMusicLibraryConfig } from '../../components/Jellyfin/MusicLibrary/MusicLibraryConfig';
import { useUser } from '../../components/Jellyfin/User/UserContext';
import { Track } from '../trackTypes';
import { useMutation } from './jellyfin';
import { ItemFields } from '@jellyfin/sdk/lib/generated-client/models';
import { ItemsApiGetItemsRequest } from '@jellyfin/sdk/lib/generated-client/api/items-api';

export interface MusicLibraryResult {
  tracks: Track[];
  /**
   * Useful if you've limited the original query to only return a subset of data
   */
  totalTracks: number;
}

export const useGetTracks = () => {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();

  const [fetch, state] = useMutation('items', 'getItems');

  const fetchWithDefaults = useCallback(
    async (
      options: ItemsApiGetItemsRequest = {}
    ): Promise<MusicLibraryResult> => {
      const result = await fetch([
        {
          ...getTracksFromLibaryDefaultOptions(user.Id, musicLibrary.id),
          ...options,
        },
      ]);

      return {
        totalTracks: result.data.TotalRecordCount as number,
        tracks: result.data.Items as Track[],
      };
    },
    [user, musicLibrary, fetch]
  );

  return [fetchWithDefaults, state] as const;
};

export const getTracksFromLibaryDefaultOptions = (
  userId: string,
  libraryId: string
): ItemsApiGetItemsRequest => ({
  userId: userId,
  parentId: libraryId,
  mediaTypes: ['Audio'],
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
});
