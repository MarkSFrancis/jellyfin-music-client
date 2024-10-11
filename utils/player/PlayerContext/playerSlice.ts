import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../../trackTypes';
import { PlayerState } from './types';

export type PlayerSliceState = ReturnType<typeof playerSlice.getInitialState>;

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    queue: [] as Track[],
    settings: {
      volume: 100,
      shuffling: false,
      repeating: false,
      muted: false,
    },
    state: PlayerState.Stopped,
    currentTrackIndex: -1,
  },
  reducers: {
    play(state) {
      if (state.queue.length === 0) {
        return;
      }

      state.currentTrackIndex = Math.max(state.currentTrackIndex, 0);
      state.state = PlayerState.Playing;
    },
    pause(state) {
      if (state.state === PlayerState.Playing) {
        state.state = PlayerState.Paused;
      }
    },
    togglePlayPause(state) {
      if (state.state === PlayerState.Playing) {
        state.state = PlayerState.Paused;
      } else if (state.state === PlayerState.Paused) {
        state.state = PlayerState.Playing;
      }
    },
    setCurrentTrackIndex(state, action: PayloadAction<number>) {
      state.currentTrackIndex = action.payload;
    },
    setCurrentTrack(state, action: PayloadAction<Track | undefined>) {
      if (!action.payload) {
        state.currentTrackIndex = -1;
      } else {
        state.currentTrackIndex = state.queue.findIndex(
          (t) => t.Id === action.payload!.Id
        );
      }
    },
    skipBackward1Track(state) {
      const {
        queue,
        currentTrackIndex,
        settings: { repeating },
      } = state;

      if (!queue.length) return;

      let prevTrackIndex = currentTrackIndex - 1;

      if (prevTrackIndex < 0) {
        if (repeating) {
          prevTrackIndex = queue.length - 1;
        } else {
          return;
        }
      }

      state.currentTrackIndex = prevTrackIndex;
    },
    skipForward1Track(state) {
      const {
        queue,
        currentTrackIndex,
        settings: { repeating },
      } = state;
      if (!queue.length) return;

      let nextTrackIndex = currentTrackIndex + 1;

      if (queue.length <= nextTrackIndex) {
        if (repeating) {
          nextTrackIndex = 0;
        } else {
          return;
        }
      }

      state.currentTrackIndex = nextTrackIndex;
    },
    addToQueue(state, action: PayloadAction<Track>) {
      state.queue = [...state.queue, action.payload];
    },
    addToUpNext(state, action: PayloadAction<Track>) {
      const nextTrackIndex = Math.max(state.currentTrackIndex + 1, 0);

      const upToIncludingCurrentTrack = state.queue.slice(0, nextTrackIndex);
      const afterCurrentTrack = state.queue.slice(nextTrackIndex);

      state.queue = [
        ...upToIncludingCurrentTrack,
        action.payload,
        ...afterCurrentTrack,
      ];
    },
    removeFromQueue(state, action: PayloadAction<Track>) {
      state.queue = state.queue.filter((t) => t.Id !== action.payload.Id);
    },
    startNewQueue(
      state,
      action: PayloadAction<{ newQueue: Track[]; startTrack?: Track }>
    ) {
      const { newQueue } = action.payload;
      const { startTrack } = action.payload;

      state.queue = newQueue;

      let startTrackIndex = 0;

      if (!newQueue.length) {
        startTrackIndex = -1;
      } else if (startTrack) {
        startTrackIndex = newQueue.findIndex((t) => t.Id === startTrack.Id);

        if (startTrackIndex < 0) {
          startTrackIndex = 0;
        }
      }

      state.currentTrackIndex = startTrackIndex;
      state.state = PlayerState.Playing;
    },
    setShuffling(state, action: PayloadAction<boolean>) {
      state.settings.shuffling = action.payload;
    },
    setRepeating(state, action: PayloadAction<boolean>) {
      state.settings.repeating = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.settings.volume = action.payload;
    },
    setMuted(state, action: PayloadAction<boolean>) {
      state.settings.muted = action.payload;
    },
  },
});

export const {
  pause,
  play,
  setCurrentTrack,
  setCurrentTrackIndex,
  setMuted,
  setRepeating,
  setShuffling,
  setVolume,
  togglePlayPause,
  addToQueue,
  addToUpNext,
  removeFromQueue,
  skipBackward1Track,
  skipForward1Track,
  startNewQueue,
} = playerSlice.actions;
