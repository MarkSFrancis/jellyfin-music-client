import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { Track } from "../trackTypes";
import { playerRepeatingAtom, usePlayerQueue } from "./PlayerContext";
import { usePlayerCurrentTrackIndex } from "./PlayerContext";

// If loading a total of more than 10 items (including the current track), you'll need to increase the HTML Audio box limit (via howler configuration)
const lookAheadMax = 2;
const lookBehindMax = 1;

export const usePreloadTracks = () => {
  const repeating = useRecoilValue(playerRepeatingAtom);
  const currentTrackIndex = usePlayerCurrentTrackIndex();
  const queue = usePlayerQueue();

  const tracksToLoad = useMemo((): Track[] => {
    if (queue.length === 0) {
      return [];
    }

    if (currentTrackIndex < 0) {
      const nextTracks = getNextTracks(queue, -1, repeating);
      const previousTracks = getPreviousTracks(queue, 0, repeating);

      return [...nextTracks, ...previousTracks];
    }

    const currentTrack = queue[currentTrackIndex];
    const previousTracks = getPreviousTracks(
      queue,
      currentTrackIndex,
      repeating
    );
    const nextTracks = getNextTracks(queue, currentTrackIndex, repeating);

    return [currentTrack, ...nextTracks, ...previousTracks];
  }, [queue, currentTrackIndex, repeating]);

  return tracksToLoad;
};

function getPreviousTracks(queue: Track[], index: number, loop: boolean) {
  if (queue.length <= lookBehindMax) {
    return queue;
  }

  const previousTracks: Track[] = [];
  for (let i = index - 1; previousTracks.length < lookBehindMax; i--) {
    if (i < 0) {
      if (!loop) break;
      i = queue.length - 1;
    }

    previousTracks.push(queue[i]);
  }

  return previousTracks;
}

function getNextTracks(queue: Track[], index: number, loop: boolean) {
  if (queue.length <= lookAheadMax) {
    return queue;
  }

  const nextTracks: Track[] = [];
  for (let i = index + 1; nextTracks.length < lookAheadMax; i++) {
    if (i >= queue.length) {
      if (!loop) break;
      i = 0;
    }

    nextTracks.push(queue[i]);
  }

  return nextTracks;
}
