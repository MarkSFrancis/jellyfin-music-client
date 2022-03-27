import {
  atom,
  DefaultValue,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Track } from "../../trackTypes";
import { playerQueueAtom } from "./PlayerQueue";

export const playerCurrentTrackIndexAtom = atom<number>({
  key: "player-current-track-index",
  default: -1,
});

/**
 * Returns the index of the first occurrence of the track in the queue, or -1 if it's not found
 */
export const findTrackIndexInQueue = (current: Track, queue: Track[]) => {
  if (!current || !queue) return -1;

  return queue.findIndex((t) => t.Id === current.Id);
};

export const playerCurrentTrackSelector = selector<Track | undefined>({
  key: "player-current-track",
  get: ({ get }) => {
    const index = get(playerCurrentTrackIndexAtom);

    if (index < 0) return undefined;

    const queue = get(playerQueueAtom);

    return queue[index];
  },
  set: ({ get, set }, newValue) => {
    if (!newValue || newValue instanceof DefaultValue) {
      set(playerCurrentTrackIndexAtom, -1);
      return;
    }

    const queue = get(playerQueueAtom);

    const trackFirstOccurrenceIndex = findTrackIndexInQueue(newValue, queue);

    set(playerCurrentTrackIndexAtom, trackFirstOccurrenceIndex);
  },
});

export const usePlayerCurrentTrackIndex = () =>
  useRecoilValue(playerCurrentTrackIndexAtom);

export const usePlayerCurrentTrack = () =>
  useRecoilValue(playerCurrentTrackSelector);

export const useSetPlayerCurrentTrackIndex = () =>
  useSetRecoilState(playerCurrentTrackIndexAtom);

export const useSetPlayerCurrentTrack = () =>
  useSetRecoilState(playerCurrentTrackSelector);
