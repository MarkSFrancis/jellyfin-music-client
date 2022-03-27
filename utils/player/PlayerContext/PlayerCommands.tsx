import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { Track } from "../../trackTypes";
import {
  usePlayerCurrentTrackIndex,
  useSetPlayerCurrentTrack,
  useSetPlayerCurrentTrackIndex,
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
  const trackIndex = usePlayerCurrentTrackIndex();
  const setQueue = useSetPlayerQueue();

  const addToUpNext = useCallback(
    (trackToQueue: Track) => {
      setQueue((queue) => {
        const nextTrackIndex = trackIndex < 0 ? 0 : trackIndex + 1;

        const upToNext = queue.slice(0, nextTrackIndex);
        const afterCurrent = queue.slice(nextTrackIndex);

        return [...upToNext, trackToQueue, ...afterCurrent];
      });
    },
    [trackIndex, setQueue]
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
  const trackIndex = usePlayerCurrentTrackIndex();
  const queue = usePlayerQueue();
  const repeating = useRecoilValue(playerRepeatingAtom);

  const canSkipBackward = useCallback(() => {
    if (repeating) return true;
    if (!queue.length) return false;

    return trackIndex > 0;
  }, [trackIndex, queue, repeating]);

  return canSkipBackward;
};

export const useSkipBackward1Track = () => {
  const setTrackIndex = useSetPlayerCurrentTrackIndex();
  const queue = usePlayerQueue();
  const repeating = useRecoilValue(playerRepeatingAtom);

  const skipBackward1Track = useCallback(() => {
    setTrackIndex((trackIndex) => {
      if (!queue.length) return trackIndex;

      let prevTrackIndex = trackIndex - 1;

      if (prevTrackIndex < 0) {
        if (repeating) {
          prevTrackIndex = queue.length - 1;
        } else {
          // Cannot skip backward
          return trackIndex;
        }
      }

      return prevTrackIndex;
    });
  }, [setTrackIndex, queue, repeating]);

  return skipBackward1Track;
};

export const useCanSkipForward = () => {
  const queue = usePlayerQueue();
  const trackIndex = usePlayerCurrentTrackIndex();
  const repeating = useRecoilValue(playerRepeatingAtom);

  const canSkipForward = useCallback(() => {
    if (!queue.length) return false;
    if (repeating) return true;
    if (trackIndex < 0) return false;

    return trackIndex < queue.length - 1;
  }, [queue, trackIndex, repeating]);

  return canSkipForward;
};

export const useSkipForward1Track = () => {
  const queue = usePlayerQueue();
  const setTrackIndex = useSetPlayerCurrentTrackIndex();
  const repeating = useRecoilValue(playerRepeatingAtom);

  const skipForward1Track = useCallback(() => {
    setTrackIndex((trackIndex) => {
      if (!queue.length) return trackIndex;

      let nextTrackIndex = trackIndex + 1;

      if (queue.length <= nextTrackIndex) {
        if (repeating) {
          nextTrackIndex = 0;
        } else {
          // Cannot skip forward
          return trackIndex;
        }
      }

      return nextTrackIndex;
    });
  }, [queue, setTrackIndex, repeating]);

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
