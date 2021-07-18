import { useCallback } from "react";
import { usePlayerCommands, usePlayerState } from "../player";
import { Track } from "../trackTypes";
import { useIsCurrentTrack } from "./useIsCurrentTrack";

export const usePlayTrack = () => {
  const { startNewQueue } = usePlayerCommands();
  const { togglePlayPause } = usePlayerState();
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
