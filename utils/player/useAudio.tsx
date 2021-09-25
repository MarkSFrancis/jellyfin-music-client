import { Howl } from "howler";
import { useCallback, useEffect, useRef, useState } from "react";
import { Track } from "../trackTypes";
import {
  usePlayerState,
  PlayerState,
  usePlayerCurrentTrack,
  usePlayerCommands,
} from "./PlayerContext";
import { LoadedAudio } from "./useAudioLoader";

export const useAudio = (loadedTracks: LoadedAudio[]) => {
  const { track } = usePlayerCurrentTrack();
  const { state } = usePlayerState();
  const { skipForward1Track } = usePlayerCommands();

  const audioTrack = useRef<Track | undefined>();
  const audioRef = useRef<Howl | undefined>();
  const [audio, setAudio] = useState<Howl | undefined>();

  useEffect(() => {
    const trackEndHandler = () => {
      skipForward1Track();
    };

    let previousAudio = audioRef.current;
    if (previousAudio) {
      previousAudio.stop();
      previousAudio.off("end", trackEndHandler);
    }

    audioRef.current = audio;

    if (!audio) {
      return;
    }

    audioRef.current.on("end", trackEndHandler);
    previousAudio = audioRef.current;

    return () => {
      if (previousAudio) {
        previousAudio.stop();
        previousAudio.off("end", trackEndHandler);
      }
    };
  }, [audio, skipForward1Track]);

  useEffect(() => {
    if (track?.Id !== audioTrack.current?.Id) {
      const playing = loadedTracks.find((t) => t.track.Id === track.Id);

      if (!playing) {
        audioTrack.current = playing.track;
        setAudio(undefined);
        return;
      }

      audioTrack.current = playing.track;
      setAudio(playing.rawAudio);
    }
  }, [loadedTracks, track]);

  useEffect(() => {
    if (!audio) return;

    if (state === PlayerState.Playing) {
      audio.play();
    } else if (state === PlayerState.Paused) {
      audio.pause();
    } else if (state === PlayerState.Stopped) {
      audio.stop();
    }
  }, [state, audio]);

  return audio;
};
