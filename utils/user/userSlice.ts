import { UserDto } from "@jellyfin/client-axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  initialState: null as UserDto | null,
  name: "user",
  reducers: {
    setUser(_state, action: PayloadAction<UserDto>) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
