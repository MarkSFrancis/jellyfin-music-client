import { useEffect } from "react";
import { usePlayerState } from "./PlayerContext/PlayerState";
import { PlayerState, usePlayerCurrentTrack } from "./PlayerContext";
import { LoadedTrack } from "./useTracks";
import { useState } from "react";

export const useTrack = (loadedTracks: LoadedTrack[]) => {
  const { track } = usePlayerCurrentTrack();
  const { state } = usePlayerState();

  const [playingTrack, setPlayingTrack] = useState<LoadedTrack>();

  useEffect(() => {
    if (track !== playingTrack?.track) {
      playingTrack?.howl.stop();
      setPlayingTrack(loadedTracks.find((t) => t.track.Id === track.Id));
    }
  }, [loadedTracks, setPlayingTrack, playingTrack, track]);

  useEffect(() => {
    if (state === PlayerState.Playing) {
      playingTrack?.howl.play();
    } else if (state === PlayerState.Paused) {
      playingTrack?.howl.pause();
    } else if (state === PlayerState.Stopped) {
      playingTrack?.howl.stop();
    }
  }, [playingTrack, state]);
};
