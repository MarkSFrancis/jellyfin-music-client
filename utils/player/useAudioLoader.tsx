import { Howl } from "howler";
import { useApi, ApiAuthContext } from "../../components/Jellyfin";
import { Track } from "../trackTypes";
import { useMemo } from "react";
import { usePreloadTracks } from "./usePreloadTracks";

// Hoist into recoil atoms

export interface LoadedAudio {
  track: Track;
  rawAudio: Howl;
}

export const useAudioLoader = () => {
  const tracks = usePreloadTracks();
  const { auth } = useApi();

  const loadedTracks = useMemo(() => {
    let tracksToLoad = tracks;
    if (!auth || !tracks) {
      tracksToLoad = [];
    }

    const newHowls = updateLoadedAudio(auth, loadedTracks, tracksToLoad);

    return newHowls;
  }, [auth, tracks]);

  return loadedTracks;
};

const updateLoadedAudio = (
  auth: ApiAuthContext,
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

const createHowl = (auth: ApiAuthContext, track: Track) => {
  const src = getTrackSrc(auth, track);

  return new Howl({
    src,
    html5: true,
  });
};

const getTrackSrc = (auth: ApiAuthContext, track: Track) => {
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

const generateAudioSrc = (options: GenerateTrackSrcOptions) => {
  const src = new URL(
    `Audio/${options.trackId}/stream.${options.trackContainer}`,
    options.serverUrl
  );

  src.searchParams.set("Static", "true");
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
