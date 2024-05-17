import { Jellyfin } from "@jellyfin/sdk";
import * as jellyfinApi from "@jellyfin/sdk/lib/utils/api";
import axios from "axios";
import { v4 } from "uuid";

export type ApiClient = ReturnType<typeof initApi>;

export const initApi = (baseUrl: string, token: string) => {
  const jellyfin = new Jellyfin({
    clientInfo: {
      name: "Jellyfin Music Client",
      version: "1.0.0",
    },
    deviceInfo: {
      name: "Web browser",
      id: v4(),
    },
  });

  const contextAxios = axios.create();
  contextAxios.defaults.headers["X-Emby-Authorization"] = token;

  const client = jellyfin.createApi(baseUrl, token, contextAxios);

  const api = {
    activityLog: jellyfinApi.getActivityLogApi(client),
    apiKey: jellyfinApi.getApiKeyApi(client),
    artists: jellyfinApi.getArtistsApi(client),
    audio: jellyfinApi.getAudioApi(client),
    branding: jellyfinApi.getBrandingApi(client),
    channels: jellyfinApi.getChannelsApi(client),
    collection: jellyfinApi.getCollectionApi(client),
    configuration: jellyfinApi.getConfigurationApi(client),
    dashboard: jellyfinApi.getDashboardApi(client),
    devices: jellyfinApi.getDevicesApi(client),
    displayPreferences: jellyfinApi.getDisplayPreferencesApi(client),
    dynamicHls: jellyfinApi.getDynamicHlsApi(client),
    environment: jellyfinApi.getEnvironmentApi(client),
    filter: jellyfinApi.getFilterApi(client),
    genres: jellyfinApi.getGenresApi(client),
    hlsSegment: jellyfinApi.getHlsSegmentApi(client),
    image: jellyfinApi.getImageApi(client),
    instantMix: jellyfinApi.getInstantMixApi(client),
    itemLookup: jellyfinApi.getItemLookupApi(client),
    itemRefresh: jellyfinApi.getItemRefreshApi(client),
    itemUpdate: jellyfinApi.getItemUpdateApi(client),
    items: jellyfinApi.getItemsApi(client),
    library: jellyfinApi.getLibraryApi(client),
    libraryStructure: jellyfinApi.getLibraryStructureApi(client),
    liveTv: jellyfinApi.getLiveTvApi(client),
    localization: jellyfinApi.getLocalizationApi(client),
    mediaInfo: jellyfinApi.getMediaInfoApi(client),
    movies: jellyfinApi.getMoviesApi(client),
    musicGenres: jellyfinApi.getMusicGenresApi(client),
    package: jellyfinApi.getPackageApi(client),
    persons: jellyfinApi.getPersonsApi(client),
    playlists: jellyfinApi.getPlaylistsApi(client),
    playState: jellyfinApi.getPlaystateApi(client),
    plugins: jellyfinApi.getPluginsApi(client),
    quickConnect: jellyfinApi.getQuickConnectApi(client),
    remoteImage: jellyfinApi.getRemoteImageApi(client),
    scheduledTasks: jellyfinApi.getScheduledTasksApi(client),
    search: jellyfinApi.getSearchApi(client),
    session: jellyfinApi.getSessionApi(client),
    startup: jellyfinApi.getStartupApi(client),
    studios: jellyfinApi.getStudiosApi(client),
    subtitle: jellyfinApi.getSubtitleApi(client),
    suggestions: jellyfinApi.getSuggestionsApi(client),
    syncPlay: jellyfinApi.getSyncPlayApi(client),
    system: jellyfinApi.getSystemApi(client),
    timeSync: jellyfinApi.getTimeSyncApi(client),
    trailers: jellyfinApi.getTrailersApi(client),
    tvShows: jellyfinApi.getTvShowsApi(client),
    universalAudio: jellyfinApi.getUniversalAudioApi(client),
    user: jellyfinApi.getUserApi(client),
    userLibrary: jellyfinApi.getUserLibraryApi(client),
    userViews: jellyfinApi.getUserViewsApi(client),
    videoAttachments: jellyfinApi.getVideoAttachmentsApi(client),
    videos: jellyfinApi.getVideosApi(client),
    years: jellyfinApi.getYearsApi(client),
  };

  return api;
};
