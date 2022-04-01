import { useEffect } from "react";
import { FC } from "react";
import { useAppDispatch } from "../../../store";
import { usePlayerAudio } from "./PlayerAudio";
import {
  getCanSkipBackward,
  getCanSkipForward,
  getPlayerCurrentTrack,
  usePlayerSelector,
} from "./playerSelectors";
import {
  pause,
  play,
  skipBackward1Track,
  skipForward1Track,
} from "./playerSlice";
import { PlayerState } from "./types";

const hasMediaSession = () => "mediaSession" in navigator;

export const MediaSessionManager: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const canSkipBackward = usePlayerSelector(getCanSkipBackward);
  const canSkipForward = usePlayerSelector(getCanSkipForward);
  const state = usePlayerSelector((state) => state.state);

  const track = usePlayerSelector(getPlayerCurrentTrack);
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
      dispatch(play());
    });
  }, [state, dispatch]);

  useEffect(() => {
    if (state !== PlayerState.Playing) return;

    return setHandler("pause", () => dispatch(pause()));
  }, [state, dispatch]);

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
    if (!canSkipBackward) return;

    return setHandler("previoustrack", () => dispatch(skipBackward1Track()));
  }, [canSkipBackward, dispatch]);

  useEffect(() => {
    if (!canSkipForward) return;

    return setHandler("nexttrack", () => dispatch(skipForward1Track()));
  }, [canSkipForward, dispatch]);

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
