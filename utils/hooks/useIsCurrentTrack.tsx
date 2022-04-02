import { useCallback } from "react";
import {
  getPlayerCurrentTrack,
  usePlayerSelector,
} from "../player/PlayerContext/playerSelectors";
import { Track } from "../trackTypes";

export const useIsCurrentTrack = () => {
  const playingTrack = usePlayerSelector(getPlayerCurrentTrack);

  return useCallback(
    (track: Track) => {
      if (!track) return false;

      return track.Id === playingTrack?.Id;
    },
    [playingTrack]
  );
};
