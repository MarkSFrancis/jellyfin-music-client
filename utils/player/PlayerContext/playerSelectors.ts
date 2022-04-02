import { useAppSelector } from "../../../store";
import { PlayerSliceState } from "./playerSlice";

export const usePlayerSelector = <TSelected>(
  selector: (state: PlayerSliceState) => TSelected
) => useAppSelector((state) => selector(state.playerState));

export const getPlayerCurrentTrack = (state: PlayerSliceState) => {
  const currentTrackIndex = state.currentTrackIndex;

  if (currentTrackIndex < 0) {
    return undefined;
  }

  return state.queue[currentTrackIndex];
};

export const getCanSkipBackward = (state: PlayerSliceState) => {
  const {
    currentTrackIndex,
    queue,
    settings: { repeating },
  } = state;

  if (!queue.length) return false;
  if (repeating) return true;

  return currentTrackIndex > 0;
};

export const getCanSkipForward = (state: PlayerSliceState) => {
  const {
    currentTrackIndex,
    queue,
    settings: { repeating },
  } = state;

  if (!queue.length) return false;
  if (repeating) return true;

  return currentTrackIndex < queue.length - 1;
};
