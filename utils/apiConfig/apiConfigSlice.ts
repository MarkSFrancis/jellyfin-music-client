import { PublicSystemInfo } from "@jellyfin/client-axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Server extends PublicSystemInfo {
  url: string;
}

export interface ApiConfig {
  server: Server;
  authToken: string;
}

export const apiConfigSlice = createSlice({
  initialState: null as ApiConfig,
  name: "apiConfig",
  reducers: {
    setApiConfig(_state, action: PayloadAction<ApiConfig>) {
      return action.payload;
    },
  },
});

export const { setApiConfig } = apiConfigSlice.actions;
