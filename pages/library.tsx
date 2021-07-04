import { Code } from "@chakra-ui/react";
import { ItemFields } from "@jellyfin/client-axios";
import React from "react";
import { useMemo } from "react";
import { useMusicLibraryConfig } from "../components/Jellyfin";
import { useUser } from "../components/Jellyfin/User/UserContext";
import { useQuery } from "../utils";

export default function Library() {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();

  const [state] = useQuery("items", "getItems", [
    {
      userId: user.Id,
      recursive: true,
      parentId: musicLibrary.id,
      limit: 10, // TODO Consider using limit for better performance / pagination
      sortBy: ItemFields.DateCreated,
      sortOrder: "Descending",
      fields: [
        ItemFields.AirTime,
        ItemFields.CanDelete,
        ItemFields.CanDownload,
        ItemFields.ChannelInfo,
        ItemFields.Chapters,
        ItemFields.ChildCount,
        ItemFields.CumulativeRunTimeTicks,
        ItemFields.CustomRating,
        ItemFields.DateCreated,
        ItemFields.DateLastMediaAdded,
        ItemFields.DisplayPreferencesId,
        ItemFields.Etag,
        ItemFields.ExternalUrls,
        ItemFields.Genres,
        ItemFields.HomePageUrl,
        ItemFields.ItemCounts,
        ItemFields.MediaSourceCount,
        ItemFields.MediaSources,
        ItemFields.OriginalTitle,
        ItemFields.Overview,
        ItemFields.ParentId,
        ItemFields.Path,
        ItemFields.People,
        ItemFields.PlayAccess,
        ItemFields.ProductionLocations,
        ItemFields.ProviderIds,
        ItemFields.PrimaryImageAspectRatio,
        ItemFields.RecursiveItemCount,
        ItemFields.Settings,
        ItemFields.ScreenshotImageTags,
        ItemFields.SeriesPrimaryImage,
        ItemFields.SeriesStudio,
        ItemFields.SortName,
        ItemFields.SpecialEpisodeNumbers,
        ItemFields.Studios,
        ItemFields.BasicSyncInfo,
        ItemFields.SyncInfo,
        ItemFields.Taglines,
        ItemFields.Tags,
        ItemFields.RemoteTrailers,
        ItemFields.MediaStreams,
        ItemFields.SeasonUserData,
        ItemFields.ServiceName,
        ItemFields.ThemeSongIds,
        ItemFields.ThemeVideoIds,
        ItemFields.ExternalEtag,
        ItemFields.PresentationUniqueKey,
        ItemFields.InheritedParentalRatingValue,
        ItemFields.ExternalSeriesId,
        ItemFields.SeriesPresentationUniqueKey,
        ItemFields.DateLastRefreshed,
        ItemFields.DateLastSaved,
        ItemFields.RefreshState,
        ItemFields.ChannelImage,
        ItemFields.EnableMediaSourceDisplay,
        ItemFields.Width,
        ItemFields.Height,
        ItemFields.ExtraIds,
        ItemFields.LocalTrailerCount,
        ItemFields.IsHD,
        ItemFields.SpecialFeatureCount,
      ],
    },
  ]);

  const data = useMemo(
    () => JSON.stringify(state.data ?? state.error, undefined, 2),
    [state]
  );

  return (
    <>
      <pre>
        <Code>Total items: {state.data?.Items?.length}</Code>
      </pre>
      <pre>
        <Code>{data}</Code>
      </pre>
    </>
  );
}
