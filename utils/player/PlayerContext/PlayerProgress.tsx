import { createContext, useContext, FC, useState } from "react";
import { PlayerProgressContext } from "./types";

const playerProgressContext = createContext<PlayerProgressContext>(undefined);

export const usePlayerProgress = () => useContext(playerProgressContext);

export const PlayerProgressProvider: FC = ({ children }) => {
  const [ticks, updateTicks] = useState(0);

  return (
    <playerProgressContext.Provider value={{ ticks, updateTicks }}>
      {children}
    </playerProgressContext.Provider>
  );
};
