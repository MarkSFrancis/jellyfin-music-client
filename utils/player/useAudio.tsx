import { Howl } from "howler";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store";
import { Track } from "../trackTypes";
import { PlayerState, skipForward1Track } from "./PlayerContext";
import {
  getPlayerCurrentTrack,
  usePlayerSelector,
} from "./PlayerContext/playerSelectors";
import { LoadedAudio } from "./useAudioLoader";

// Hoist into recoil selectors

export const useAudio = (loadedTracks: LoadedAudio[]) => {
  const track = usePlayerSelector(getPlayerCurrentTrack);
  const state = usePlayerSelector((state) => state.state);
  const dispatch = useAppDispatch();

  const audioTrack = useRef<Track | undefined>();
  const audioRef = useRef<Howl | undefined>();
  const [audio, setAudio] = useState<Howl | undefined>();
  const dispatchRef = useRef<typeof dispatch>(dispatch);

  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  useEffect(() => {
    const trackEndHandler = () => {
      dispatchRef.current(skipForward1Track());
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
