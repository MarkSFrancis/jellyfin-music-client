import { Howl } from 'howler';

export type PlayerAudioContext = Howl | undefined;

export enum PlayerState {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped',
  Loading = 'loading',
}
