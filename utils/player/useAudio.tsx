import { useEffect } from "react";
import { usePlayerState } from "./PlayerContext/PlayerState";
import { PlayerState, usePlayerCurrentTrack } from "./PlayerContext";
import { LoadedAudio } from "./useAudioLoader";
import { useState } from "react";

export const useAudio = (loadedTracks: LoadedAudio[]) => {
  const { track } = usePlayerCurrentTrack();
  const { state } = usePlayerState();

  const [playingTrack, setPlayingTrack] = useState<LoadedAudio | undefined>();

  useEffect(() => {
    if (track !== playingTrack?.track) {
      playingTrack?.rawAudio.stop();

      if (track) {
        setPlayingTrack(loadedTracks.find((t) => t.track.Id === track.Id));
      } else {
        setPlayingTrack(undefined);
      }
    }
  }, [loadedTracks, setPlayingTrack, playingTrack, track]);

  useEffect(() => {
    if (state === PlayerState.Playing) {
      playingTrack?.rawAudio.play();
    } else if (state === PlayerState.Paused) {
      playingTrack?.rawAudio.pause();
    } else if (state === PlayerState.Stopped) {
      playingTrack?.rawAudio.stop();
    }
  }, [playingTrack, state]);

  return playingTrack;
};
