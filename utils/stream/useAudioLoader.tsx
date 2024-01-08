import { Howl } from "howler";
import { useApiConfig } from "../../components/Jellyfin/useApiConfig";
import { Track } from "../trackTypes";
import { useMemo, useRef } from "react";
import { usePreloadTracks } from "./usePreloadTracks";
import { ApiConfig } from "../apiConfig/apiConfigSlice";
import { getTrackSrc } from "./getTrackSrc";

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
