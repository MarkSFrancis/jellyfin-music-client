import { createContext, useContext } from "react";

const playerContext = createContext(undefined);

export const usePlayer = () => useContext(playerContext);

export const PlayerProvider = playerContext.Provider;
