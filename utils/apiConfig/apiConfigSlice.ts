import { PublicSystemInfo } from '@jellyfin/sdk/lib/generated-client/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Server extends PublicSystemInfo {
  url: string;
}

export interface ApiConfig {
  server: Server;
  authToken: string;
}

export const apiConfigSlice = createSlice({
  initialState: null as ApiConfig | null,
  name: 'apiConfig',
  reducers: {
    setApiConfig(_state, action: PayloadAction<ApiConfig>) {
      return action.payload;
    },
  },
});

export const { setApiConfig } = apiConfigSlice.actions;
