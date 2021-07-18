import { useEffect } from "react";
import { FC } from "react";
import { usePlayerAudio } from "./PlayerAudio";
import { usePlayerCommands } from "./PlayerCommands";
import { usePlayerCurrentTrack } from "./PlayerCurrentTrack";
import { usePlayerState } from "./PlayerState";
import { PlayerState } from "./types";

const hasMediaSession = () => "mediaSession" in navigator;

export const MediaSessionManager: FC = ({ children }) => {
  const {
    canSkipBackward,
    skipBackward1Track,
    canSkipForward,
    skipForward1Track,
  } = usePlayerCommands();
  const { state, setState } = usePlayerState();
  const { track } = usePlayerCurrentTrack();
  const { rawAudio } = usePlayerAudio();

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

    return setHandler("play", () => setState(PlayerState.Playing));
  }, [state, setState]);

  useEffect(() => {
    if (state !== PlayerState.Playing) return;

    return setHandler("pause", () => setState(PlayerState.Paused));
  }, [state, setState]);

  useEffect(() => {
    if (!canSkipBackward()) return;

    return setHandler("previoustrack", skipBackward1Track);
  }, [canSkipBackward, skipBackward1Track]);

  useEffect(() => {
    if (!canSkipForward()) return;

    return setHandler("nexttrack", skipForward1Track);
  }, [canSkipForward, skipForward1Track]);

  useEffect(() => {
    if (!rawAudio) return;

    return setHandler("seekto", (details) => {
      if (details.fastSeek) return;

      rawAudio.seek(details.seekTime);
    });
  }, [rawAudio]);

  return <>{children}</>;
};

const setHandler = (
  event: string,
  handler: (details: MediaSessionActionDetails) => void
) => {
  if (!hasMediaSession()) return;

  navigator.mediaSession.setActionHandler(event, handler);

  return () => navigator.mediaSession.setActionHandler(event, null);
};
