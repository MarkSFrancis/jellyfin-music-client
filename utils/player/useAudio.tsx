import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
import { Track } from "../trackTypes";
import {
  usePlayerState,
  PlayerState,
  usePlayerCurrentTrack,
  useSkipForward1Track,
} from "./PlayerContext";
import { LoadedAudio } from "./useAudioLoader";

// Hoist into recoil selectors

export const useAudio = (loadedTracks: LoadedAudio[]) => {
  const track = usePlayerCurrentTrack();
  const state = usePlayerState();
  const skipForward1Track = useSkipForward1Track();

  const audioTrack = useRef<Track | undefined>();
  const audioRef = useRef<Howl | undefined>();
  const [audio, setAudio] = useState<Howl | undefined>();
  const skipForward1TrackRef =
    useRef<typeof skipForward1Track>(skipForward1Track);

  useEffect(() => {
    skipForward1TrackRef.current = skipForward1Track;
  }, [skipForward1Track]);

  useEffect(() => {
    const trackEndHandler = () => {
      skipForward1TrackRef.current();
    };

    audioRef.current = audio;

    if (!audio) {
      return;
    }

    audioRef.current.on("end", trackEndHandler);
    const previousAudio = audioRef.current;

    return () => {
      if (previousAudio) {
        if (previousAudio !== audioRef.current) {
          previousAudio.stop();
        }
        previousAudio.off("end", trackEndHandler);
      }
    };
  }, [audio]);

  useEffect(() => {
    if (track?.Id === audioTrack.current?.Id) {
      return;
    }

    const playing = loadedTracks.find((t) => t.track.Id === track.Id);

    if (!playing) {
      audioTrack.current = undefined;
      audioRef.current = undefined;
      setAudio(undefined);
      return;
    }

    audioTrack.current = playing.track;
    audioRef.current = playing.rawAudio;
    setAudio(playing.rawAudio);
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
