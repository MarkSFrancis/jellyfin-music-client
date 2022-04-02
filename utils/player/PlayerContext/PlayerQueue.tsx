import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../../trackTypes";

export const playerQueueSlice = createSlice({
  name: "player-queue",
  initialState: [] as Track[],
  reducers: {
    setPlayerQueue: (_, action: PayloadAction<Track[]>) => {
      return action.payload;
    },
  },
});

export const { setPlayerQueue } = playerQueueSlice.actions;
