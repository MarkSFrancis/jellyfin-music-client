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
  }, [audio]);

  useEffect(() => {
    if (track?.Id === audioTrack.current?.Id) {
      return;
    }

    const playing = loadedTracks.find((t) => t.track.Id === track.Id);

    if (!playing) {
      audioTrack.current = undefined;
      setAudio(undefined);
      return;
    }

    audioTrack.current = playing.track;
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
