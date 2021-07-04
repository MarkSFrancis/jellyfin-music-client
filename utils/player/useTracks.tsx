import { Howl } from "howler";
import { useApi, ApiAuthContext } from "../../components/Jellyfin";
import { Track } from "../trackTypes";
import { useEffect } from "react";
import { usePreloadTracks } from "./trackPreload";
import { useState } from "react";

export interface LoadedTrack {
  track: Track;
  howl: Howl;
}

export const useTracks = () => {
  const tracks = usePreloadTracks();
  const { auth } = useApi();

  const [loadedTracks, setLoadedTracks] = useState<LoadedTrack[]>([]);

  useEffect(() => {
    let tracksToLoad = tracks;
    if (!auth || !tracks) {
      tracksToLoad = [];
    }

    const newHowls = updateLoadedTracks(auth, loadedTracks, tracksToLoad);

    setLoadedTracks(newHowls);
  }, [auth, loadedTracks, tracks]);

  return loadedTracks;
};

const updateLoadedTracks = (
  auth: ApiAuthContext,
  existingLoadedTracks: LoadedTrack[] | undefined,
  tracksToLoad: Track[]
) => {
  const cleanedTracks = removeUnusedTracks(existingLoadedTracks, tracksToLoad);

  const newTracks = tracksToLoad.filter(
    (t) => !cleanedTracks.find((h) => h.track.Id === t.Id)
  );

  if (cleanedTracks === existingLoadedTracks && newTracks.length === 0) {
    return existingLoadedTracks;
  }

  const newHowls = [
    ...cleanedTracks,
    ...newTracks.map((t) => ({
      howl: createHowl(auth, t),
      track: t,
    })),
  ];

  return newHowls;
};

const removeUnusedTracks = (
  existingLoadedTracks: LoadedTrack[] | undefined,
  tracksToKeep: Track[]
) => {
  const cleanedTracks = (existingLoadedTracks ?? []).filter((h) => {
    if (tracksToKeep.includes(h.track)) {
      return h;
    }

    h.howl.unload();
  });

  if (cleanedTracks.length === existingLoadedTracks.length) {
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

  return generateTrackSrc({
    serverUrl: auth.serverUrl,
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

const generateTrackSrc = (options: GenerateTrackSrcOptions) => {
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
