import { useCallback } from "react";
import { useAppDispatch } from "../../store";
import { startNewQueue, togglePlayPause } from "../player";
import { Track } from "../trackTypes";
import { useIsCurrentTrack } from "./useIsCurrentTrack";

export const usePlayTrack = () => {
  const dispatch = useAppDispatch();
  const isCurrentTrack = useIsCurrentTrack();

  const handlePlayPauseTrack = useCallback(
    (track: Track, trackPlaylist: Track[]) => {
      if (isCurrentTrack(track)) {
        dispatch(togglePlayPause());
      } else {
        dispatch(startNewQueue({ newQueue: trackPlaylist, startTrack: track }));
      }
    },
    [isCurrentTrack, dispatch]
  );

  return handlePlayPauseTrack;
};
