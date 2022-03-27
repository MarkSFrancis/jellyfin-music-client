import { Howl } from "howler";
import { Dispatch, SetStateAction } from "react";
import { Track } from "../../trackTypes";

export interface PlayerSettingsContext {
  volume: number;
  setVolume: (newVolume: number) => void;
  muted: boolean;
  toggleMuted: () => void;
  repeating: boolean;
  toggleRepeating: () => void;
  shuffling: boolean;
  toggleShuffling: () => void;
}

export type PlayerAudioContext = Howl | undefined;

export interface PlayerCurrentTrackContext {
  track: Track | undefined;
  setTrack: Dispatch<SetStateAction<Track | undefined>>;
}

export interface PlayerQueueContext {
  queue: Track[];
  setQueue: Dispatch<SetStateAction<Track[]>>;
}

export enum PlayerState {
  Playing = "playing",
  Paused = "paused",
  Stopped = "stopped",
  Loading = "loading",
}

export interface PlayerStateContext {
  state: PlayerState;
  togglePlayPause: () => void;
  setState: Dispatch<SetStateAction<PlayerState>>;
}
