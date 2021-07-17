import { useCallback } from "react";
import { useState, createContext, useContext, FC } from "react";
import { PlayerState, PlayerStateContext } from "./types";

const playerStateContext = createContext<PlayerStateContext>(undefined);

export const usePlayerState = () => useContext(playerStateContext);

export const PlayerStateProvider: FC = ({ children }) => {
  const [state, setState] = useState<PlayerState>(PlayerState.Stopped);

  const togglePlayPause = useCallback(() => {
    setState((state) => {
      if (state === PlayerState.Playing) {
        return PlayerState.Paused;
      } else if (state === PlayerState.Paused) {
        return PlayerState.Playing;
      }
      return state;
    });
  }, [setState]);

  return (
    <playerStateContext.Provider value={{ state, setState, togglePlayPause }}>
      {children}
    </playerStateContext.Provider>
  );
};
