import { useEffect } from "react";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { usePlayerAudio } from "./PlayerAudio";
import {
  useCanSkipBackward,
  useSkipBackward1Track,
  useCanSkipForward,
  useSkipForward1Track,
} from "./PlayerCommands";
import { usePlayerCurrentTrack } from "./PlayerCurrentTrack";
import { playerStateAtom } from "./PlayerState";
import { PlayerState } from "./types";

const hasMediaSession = () => "mediaSession" in navigator;

export const MediaSessionManager: FC = ({ children }) => {
  const canSkipBackward = useCanSkipBackward();
  const skipBackward1Track = useSkipBackward1Track();
  const canSkipForward = useCanSkipForward();
  const skipForward1Track = useSkipForward1Track();
  const [state, setState] = useRecoilState(playerStateAtom);

  const track = usePlayerCurrentTrack();
  const rawAudio = usePlayerAudio();

  useEffect(() => {
    if (!hasMediaSession()) return;

    if (!track) {
      navigator.mediaSession.metadata = null;
    } else {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.Name,
        artist: track.ArtistItems?.map((a) => a.Name).join("; "),
        album: track.Album,
        artwork: [],
      });
    }
  }, [track]);

  useEffect(() => {
    if (state !== PlayerState.Paused) return;

    return setHandler("play", () => {
      setState(PlayerState.Playing);
    });
  }, [state, setState]);

  useEffect(() => {
    if (state !== PlayerState.Playing) return;

    return setHandler("pause", () => setState(PlayerState.Paused));
  }, [state, setState]);

  useEffect(() => {
    if (state === PlayerState.Playing) {
      navigator.mediaSession.playbackState = "playing";
    } else if (state === PlayerState.Paused) {
      navigator.mediaSession.playbackState = "paused";
    } else {
      navigator.mediaSession.playbackState = "none";
    }
  }, [state]);

  useEffect(() => {
    if (!canSkipBackward()) return;

    return setHandler("previoustrack", skipBackward1Track);
  }, [canSkipBackward, skipBackward1Track]);

  useEffect(() => {
    if (!canSkipForward()) return;

    return setHandler("nexttrack", skipForward1Track);
  }, [canSkipForward, skipForward1Track]);

  useEffect(() => {
    return setHandler("seekto", (details) => {
      if (details.fastSeek) return;

      rawAudio?.seek(details.seekTime);
    });
  }, [rawAudio]);

  return <>{children}</>;
};

const setHandler = (
  event: MediaSessionAction,
  handler: (details: MediaSessionActionDetails) => void
) => {
  if (!hasMediaSession()) return;

  navigator.mediaSession.setActionHandler(event, handler);

  return () => navigator.mediaSession.setActionHandler(event, null);
};
