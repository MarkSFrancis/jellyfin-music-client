import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { Track } from "../../trackTypes";
import {
  usePlayerCurrentTrack,
  useSetPlayerCurrentTrack,
} from "./PlayerCurrentTrack";
import { usePlayerQueue, useSetPlayerQueue } from "./PlayerQueue";
import { playerRepeatingAtom } from "./PlayerSettings";
import { useSetPlayerState } from "./PlayerState";
import { PlayerState } from "./types";

export const useAddToQueue = () => {
  const setQueue = useSetPlayerQueue();

  const addToQueue = useCallback(
    (track: Track) => {
      setQueue((queue) => [...queue, track]);
    },
    [setQueue]
  );

  return addToQueue;
};

export const useAddToUpNext = () => {
  const setQueue = useSetPlayerQueue();

  const addToUpNext = useCallback(
    (track: Track) => {
      setQueue((queue) => {
        const currentTrackIndex = getCurrentTrackIndex(track, queue);

        const nextTrackIndex =
          currentTrackIndex < 0 ? 0 : currentTrackIndex + 1;

        const upToNext = queue.slice(0, nextTrackIndex);
        const afterCurrent = queue.slice(nextTrackIndex);

        return [...upToNext, track, ...afterCurrent];
      });
    },
    [setQueue]
  );

  return addToUpNext;
};

export const useJumpToTrackInQueue = () => {
  const setTrack = useSetPlayerCurrentTrack();
  const setState = useSetPlayerState();

  const jumpToTrackInQueue = useCallback(
    (track) => {
      setTrack(track);
      setState(PlayerState.Playing);
    },
    [setTrack, setState]
  );

  return jumpToTrackInQueue;
};

export const useRemoveFromQueue = () => {
  const setQueue = useSetPlayerQueue();

  const removeFromQueue = useCallback(
    (track) => {
      setQueue((q) => q.filter((t) => t !== track));
    },
    [setQueue]
  );

  return removeFromQueue;
};

export const useCanSkipBackward = () => {
  const track = usePlayerCurrentTrack();
  const queue = usePlayerQueue();
  const repeating = useRecoilValue(playerRepeatingAtom);

  const canSkipBackward = useCallback(() => {
    if (repeating) return true;

    const currentTrackIndex = getCurrentTrackIndex(track, queue);
    return currentTrackIndex > 0;
  }, [track, queue, repeating]);

  return canSkipBackward;
};

export const useSkipBackward1Track = () => {
  const setTrack = useSetPlayerCurrentTrack();
  const queue = usePlayerQueue();
  const repeating = useRecoilValue(playerRepeatingAtom);

  const skipBackward1Track = useCallback(() => {
    setTrack((track) => {
      const currentTrackIndex = getCurrentTrackIndex(track, queue);
      let prevTrackIndex = currentTrackIndex - 1;

      if (prevTrackIndex < 0) {
        if (repeating) {
          prevTrackIndex = queue.length - 1;
        } else {
          // Cannot skip backward
          return track;
        }
      }

      return queue[prevTrackIndex];
    });
  }, [setTrack, queue, repeating]);

  return skipBackward1Track;
};

export const useCanSkipForward = () => {
  const queue = usePlayerQueue();
  const track = usePlayerCurrentTrack();
  const repeating = useRecoilValue(playerRepeatingAtom);

  const canSkipForward = useCallback(() => {
    if (repeating) return true;

    const currentTrackIndex = getCurrentTrackIndex(track, queue);
    if (currentTrackIndex < 0) return false;

    return currentTrackIndex < queue.length - 1;
  }, [queue, track, repeating]);

  return canSkipForward;
};

export const useSkipForward1Track = () => {
  const queue = usePlayerQueue();
  const setTrack = useSetPlayerCurrentTrack();
  const repeating = useRecoilValue(playerRepeatingAtom);

  const skipForward1Track = useCallback(() => {
    setTrack((track) => {
      const currentTrackIndex = getCurrentTrackIndex(track, queue);
      let nextTrackIndex = Math.max(currentTrackIndex, -1) + 1;

      if (queue.length <= nextTrackIndex) {
        if (repeating) {
          nextTrackIndex = 0;
        } else {
          // Cannot skip forward
          return track;
        }
      }

      return queue[nextTrackIndex];
    });
  }, [queue, setTrack, repeating]);

  return skipForward1Track;
};

export const useStartNewQueue = () => {
  const setQueue = useSetPlayerQueue();
  const setTrack = useSetPlayerCurrentTrack();
  const setState = useSetPlayerState();

  const startNewQueue = useCallback(
    (newQueue: Track[], startTrack?: Track) => {
      setQueue(newQueue);
      if (!startTrack || !newQueue.includes(startTrack)) {
        startTrack = newQueue[0];
      }
      if (!startTrack) return; // Empty queue

      setTrack(startTrack);
      setState(PlayerState.Playing);
    },
    [setQueue, setTrack, setState]
  );

  return startNewQueue;
};

const getCurrentTrackIndex = (current: Track, queue: Track[]) =>
  queue.findIndex((t) => t === current);
