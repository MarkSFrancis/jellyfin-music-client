import { useContext } from "react";
import { createContext } from "react";

export interface PlayerBarContext {
  scrollRef: React.MutableRefObject<HTMLDivElement>;
}

const playerBarContext = createContext<PlayerBarContext>(undefined);

export const usePlayerBar = () => useContext(playerBarContext);

export const PlayerBarProvider = playerBarContext.Provider;
