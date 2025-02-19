import { useMemo } from 'react';
import { Track } from '../../../utils';
import {
  getPlayerCurrentTrack,
  usePlayerSelector,
} from '../../../utils/player/PlayerContext/playerSelectors';

export type UpNextQueue = Readonly<
  [previous: Track[], current: Track | undefined, next: Track[]]
>;

export const useUpNext = (): UpNextQueue => {
  const queue = usePlayerSelector((state) => state.queue);
  const track = usePlayerSelector(getPlayerCurrentTrack);

  const upNext: UpNextQueue = useMemo(() => {
    let previous: Track[];
    let current = track;
    let next: Track[];
    let currentTrackIndex: number;

    if (!track) {
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
