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

export interface PlayerCommandsContext {
  addToQueue: (track: Track) => void;
  removeFromQueue: (track: Track) => void;
  skipForward1Track: () => void;
  skipBackward1Track: () => void;
  jumpToTrackInQueue: (track: Track) => void;
  addToUpNext: (track: Track) => void;
  startNewQueue: (newQueue: Track[], startTrack?: Track) => void;
  togglePlayPause: () => void;
  stop: () => void;
}

export interface PlayerProgressContext {
  ticks: number;
  updateTicks: (tick: number) => void;
}

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
  setState: Dispatch<SetStateAction<PlayerState>>;
}
