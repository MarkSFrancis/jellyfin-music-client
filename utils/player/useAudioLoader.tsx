import { Howl } from "howler";
import { useApiConfig } from "../../components/Jellyfin";
import { Track } from "../trackTypes";
import { useMemo, useRef } from "react";
import { usePreloadTracks } from "./usePreloadTracks";
import { ApiConfig } from "../apiConfig/apiConfigSlice";

// Hoist into redux

export interface LoadedAudio {
  track: Track;
  rawAudio: Howl;
}

export const useAudioLoader = () => {
  const preloadTracks = usePreloadTracks();
  const apiConfig = useApiConfig();
  const loadedTracksRef = useRef<LoadedAudio[]>([]);

  const loadedTracks = useMemo(() => {
    let tracksToLoad = preloadTracks;
    if (!apiConfig || !preloadTracks) {
      tracksToLoad = [];
    }

    const newHowls = updateLoadedAudio(
      apiConfig,
      loadedTracksRef.current,
      tracksToLoad
    );

    loadedTracksRef.current = newHowls;
    return newHowls;
  }, [apiConfig, preloadTracks]);

  return loadedTracks;
};

const updateLoadedAudio = (
  auth: ApiConfig,
  existingLoadedTracks: LoadedAudio[] | undefined,
  tracksToLoad: Track[]
) => {
  const cleanedTracks = unloadUnusedAudio(existingLoadedTracks, tracksToLoad);

  const newTracks = tracksToLoad.filter(
    (t) => !cleanedTracks.find((h) => h.track.Id === t.Id)
  );

  if (cleanedTracks === existingLoadedTracks && newTracks.length === 0) {
    return existingLoadedTracks;
  }

  const newHowls = [
    ...cleanedTracks,
    ...newTracks.map((t) => ({
      rawAudio: createHowl(auth, t),
      track: t,
    })),
  ];

  return newHowls;
};

const unloadUnusedAudio = (
  existingLoadedTracks: LoadedAudio[] | undefined,
  tracksToKeep: Track[]
) => {
  existingLoadedTracks = existingLoadedTracks ?? [];

  const cleanedTracks = existingLoadedTracks.filter((h) => {
    if (tracksToKeep.find((t) => t.Id === h.track.Id)) {
      return true;
    }

    h.rawAudio.unload();
    return false;
  });

  if (cleanedTracks.length === existingLoadedTracks.length) {
    // Tracks are unchanged
    return existingLoadedTracks;
  }

  return cleanedTracks;
};

const createHowl = (auth: ApiConfig, track: Track) => {
  const src = getTrackSrc(auth, track);

  const howl = new Howl({
    src,
    html5: true,
  });

  return howl;
};

const getTrackSrc = (auth: ApiConfig, track: Track) => {
  const stream = track.MediaSources[0];
  if (!stream) {
    throw new Error("Cannot generate streaming URL");
  }

  return generateAudioSrc({
    serverUrl: auth.server.url,
    trackContainer: stream.Container,
    trackId: stream.Id,
    userToken: auth.authToken,
  });
};

interface GenerateTrackSrcOptions {
  serverUrl: string;
  trackId: string;
  trackContainer: string;
  deviceId?: string;
  userToken?: string;
  trackTag?: string;
}

// TODO migrate to some local settings so that the user can configure this
type QualityMode = "MEDIUM_QUALITY" | "ORIGINAL_QUALITY";
const QUALITY_MODE: QualityMode = "MEDIUM_QUALITY" as QualityMode;

const generateAudioSrc = (options: GenerateTrackSrcOptions) => {
  let src: URL;

  switch (QUALITY_MODE) {
    case "MEDIUM_QUALITY":
      src = new URL(`Audio/${options.trackId}/stream.aac`, options.serverUrl);
      src.searchParams.set("audioCodec", "aac");
      src.searchParams.set("audioBitRate", "128000");
      src.searchParams.set("context", "static");
      break;
    case "ORIGINAL_QUALITY":
      src = new URL(
        `Audio/${options.trackId}/stream.${options.trackContainer}`,
        options.serverUrl
      );
      src.searchParams.set("static", "true");
      break;
    default:
      throw new Error(
        `Unrecognised audio format quality mode: ${QUALITY_MODE}`
      );
  }

  src.searchParams.set("mediaSourceId", options.trackId);

  if (options.deviceId) {
    src.searchParams.set("deviceId", options.deviceId);
  }

  if (options.userToken) {
    src.searchParams.set("api_key", options.userToken);
  }

  if (options.trackTag) {
    src.searchParams.set("Tag", options.trackTag);
  }

  return src.toString();
};
