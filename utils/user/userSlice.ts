import { UserDto } from "@jellyfin/sdk/lib/generated-client/models";
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
