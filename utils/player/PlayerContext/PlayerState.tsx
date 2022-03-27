import { FC, useCallback } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { PlayerState } from "./types";

export const playerStateAtom = atom<PlayerState>({
  key: "player-state",
  default: PlayerState.Stopped,
});

export const useSetPlayerState = () => useSetRecoilState(playerStateAtom);

export const usePlayerState = () => useRecoilValue(playerStateAtom);

export const useTogglePlayPause = () => {
  const [state, setState] = useRecoilState(playerStateAtom);

  return useCallback(() => {
    if (state === PlayerState.Playing) {
      setState(PlayerState.Paused);
    } else if (state === PlayerState.Paused) {
      setState(PlayerState.Playing);
    }
    // else do nothing - not in a valid state to toggle
  }, [state, setState]);
};

export const PlayerStateProvider: FC = ({ children }) => {
  return <>{children}</>;
};
