import { useState, createContext, useContext, FC } from "react";
import { PlayerState, PlayerStateContext } from "./types";

const playerStateContext = createContext<PlayerStateContext>(undefined);

export const usePlayerState = () => useContext(playerStateContext);

export const PlayerStateProvider: FC = ({ children }) => {
  const [state, setState] = useState<PlayerState>(PlayerState.Stopped);

  return (
    <playerStateContext.Provider value={{ state, setState }}>
      {children}
    </playerStateContext.Provider>
  );
};
