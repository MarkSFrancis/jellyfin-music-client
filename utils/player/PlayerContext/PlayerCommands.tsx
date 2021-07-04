import { FC, createContext, useContext, useCallback } from "react";
import { Track } from "../../trackTypes";
import { usePlayerCurrentTrack } from "./PlayerCurrentTrack";
import { usePlayerQueue } from "./PlayerQueue";
import { usePlayerSettings } from "./PlayerSettings";
import { usePlayerState } from "./PlayerState";
import { PlayerCommandsContext, PlayerState } from "./types";

const playerCommandsContext = createContext<PlayerCommandsContext>(undefined);

export const usePlayerCommands = () => useContext(playerCommandsContext);

const getCurrentTrackIndex = (current: Track, queue: Track[]) =>
  queue.findIndex((t) => t === current);

export const PlayerCommandsProvider: FC = ({ children }) => {
  const { setQueue, queue } = usePlayerQueue();
  const { track, setTrack } = usePlayerCurrentTrack();
  const { setState } = usePlayerState();
  const { repeating } = usePlayerSettings();

  const addToUpNext: PlayerCommandsContext["addToQueue"] = useCallback(
    (newTrack) => {
      setQueue((q) => {
        const currentTrackIndex = getCurrentTrackIndex(track, q);

        const nextTrackIndex =
          currentTrackIndex < 0 ? 0 : currentTrackIndex + 1;

        const upToNext = q.slice(0, nextTrackIndex);
        const afterCurrent = q.slice(nextTrackIndex);

        return [...upToNext, newTrack, ...afterCurrent];
      });
    },
    [track, setQueue]
  );

  const jumpToTrackInQueue: PlayerCommandsContext["jumpToTrackInQueue"] =
    useCallback(
      (track) => {
        setTrack(track);
      },
      [setTrack]
    );

  const startNewQueue: PlayerCommandsContext["startNewQueue"] = useCallback(
    (newQueue: Track[], startTrack?: Track) => {
      setQueue(newQueue);
      if (!startTrack) {
        startTrack = newQueue[0];
      } else if (!newQueue.includes(startTrack)) {
        startTrack = undefined;
      }
      if (!startTrack) return;

      setTrack(startTrack);
      setState(PlayerState.Playing);
    },
    [setTrack, setState, setQueue]
  );

  const skipBackward1Track: PlayerCommandsContext["skipBackward1Track"] =
    useCallback(() => {
      setTrack((t) => {
        const currentTrackIndex = getCurrentTrackIndex(t, queue);
        let prevTrackIndex = currentTrackIndex < 0 ? 0 : currentTrackIndex - 1;

        if (prevTrackIndex < 0) {
          if (repeating) {
            prevTrackIndex = queue.length - 1;
          }
        } else {
          // TODO stop playback
        }

        return queue[prevTrackIndex];
      });
    }, [setTrack, queue, repeating]);

  const skipForward1Track: PlayerCommandsContext["skipForward1Track"] =
    useCallback(() => {
      setTrack((t) => {
        const currentTrackIndex = getCurrentTrackIndex(t, queue);
        let nextTrackIndex = currentTrackIndex < 0 ? 0 : currentTrackIndex + 1;

        if (queue.length >= nextTrackIndex) {
          if (repeating) {
            nextTrackIndex = 0;
          }
        } else {
          // TODO stop playback
        }

        return queue[nextTrackIndex];
      });
    }, [setTrack, queue, repeating]);

  const stop: PlayerCommandsContext["stop"] = useCallback(() => {
    setState(PlayerState.Stopped);
    setQueue([]);
  }, [setState, setQueue]);

  const togglePlayPause: PlayerCommandsContext["togglePlayPause"] =
    useCallback(() => {
      setState((s) =>
        s === PlayerState.Playing ? PlayerState.Paused : PlayerState.Playing
      );
    }, [setState]);

  const addToQueue: PlayerCommandsContext["addToQueue"] = useCallback(
    (track) => {
      setQueue((q) => [...q, track]);
    },
    [setQueue]
  );

  const removeFromQueue: PlayerCommandsContext["removeFromQueue"] = useCallback(
    (track) => setQueue((q) => q.filter((t) => t !== track)),
    [setQueue]
  );

  return (
    <playerCommandsContext.Provider
      value={{
        addToQueue,
        addToUpNext,
        jumpToTrackInQueue,
        removeFromQueue,
        skipBackward1Track,
        skipForward1Track,
        startNewQueue,
        stop,
        togglePlayPause,
      }}
    >
      {children}
    </playerCommandsContext.Provider>
  );
};
