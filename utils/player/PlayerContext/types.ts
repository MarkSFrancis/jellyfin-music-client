import { Howl } from "howler";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
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
  canSkipForward: () => boolean;
  skipForward1Track: () => void;
  canSkipBackward: () => boolean;
  skipBackward1Track: () => void;
  jumpToTrackInQueue: (track: Track) => void;
  addToUpNext: (track: Track) => void;
  startNewQueue: (newQueue: Track[], startTrack?: Track) => void;
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
