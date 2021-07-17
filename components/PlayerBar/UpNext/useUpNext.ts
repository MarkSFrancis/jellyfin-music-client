import { useMemo } from "react";
import { usePlayerQueue, usePlayerCurrentTrack, Track } from "../../../utils";

export type UpNextQueue = Readonly<
  [previous: Track[], current: Track | undefined, next: Track[]]
>;

export const useUpNext = (): UpNextQueue => {
  const { queue } = usePlayerQueue();
  const { track } = usePlayerCurrentTrack();

  const upNext: UpNextQueue = useMemo(() => {
    let previous: Track[];
    let current = track;
    let next: Track[];
    let currentTrackIndex: number;

    if (!queue || !track) {
      currentTrackIndex = -1;
    } else {
      currentTrackIndex = queue.findIndex((q) => q.Id === track.Id);
    }

    if (currentTrackIndex < 0) {
      previous = [];
      next = queue;
      current = undefined;
    } else {
      previous = queue.slice(0, currentTrackIndex);
      next = queue.slice(currentTrackIndex + 1);
    }

    return [previous, current, next];
  }, [queue, track]);

  return upNext;
};
