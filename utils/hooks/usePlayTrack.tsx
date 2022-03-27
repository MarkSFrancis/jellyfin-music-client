import { useCallback } from "react";
import { useStartNewQueue, useTogglePlayPause } from "../player";
import { Track } from "../trackTypes";
import { useIsCurrentTrack } from "./useIsCurrentTrack";

export const usePlayTrack = () => {
  const startNewQueue = useStartNewQueue();
  const togglePlayPause = useTogglePlayPause();
  const isCurrentTrack = useIsCurrentTrack();

  const handlePlayPauseTrack = useCallback(
    (track: Track, trackPlaylist: Track[]) => {
      if (isCurrentTrack(track)) {
        togglePlayPause();
      } else {
        startNewQueue(trackPlaylist, track);
      }
    },
    [startNewQueue, togglePlayPause, isCurrentTrack]
  );

  return handlePlayPauseTrack;
};
