import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { apiConfigSlice } from '../utils/apiConfig/apiConfigSlice';
import { playerSlice } from '../utils/player/PlayerContext/playerSlice';
import { userSlice } from '../utils/user/userSlice';

export const store = configureStore({
  reducer: {
    playerState: playerSlice.reducer,
    userState: userSlice.reducer,
    apiConfigState: apiConfigSlice.reducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
