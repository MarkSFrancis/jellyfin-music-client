import { useCallback } from "react";
import { usePlayerCurrentTrack } from "../player";
import { Track } from "../trackTypes";

export const useIsCurrentTrack = () => {
  const playingTrack = usePlayerCurrentTrack();

  return useCallback(
    (track: Track) => {
      if (!track) return false;

      return track.Id === playingTrack?.Id;
    },
    [playingTrack]
  );
};
