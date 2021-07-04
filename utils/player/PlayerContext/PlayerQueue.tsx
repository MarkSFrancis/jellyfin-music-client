import { FC, useState, useContext, createContext } from "react";
import { Track } from "../../trackTypes";
import { PlayerQueueContext } from "./types";

const playerQueueContext = createContext<PlayerQueueContext>(undefined);

export const usePlayerQueue = () => useContext(playerQueueContext);

export const PlayerQueueProvider: FC = ({ children }) => {
  const [queue, setQueue] = useState<Track[]>([]);

  return (
    <playerQueueContext.Provider value={{ queue, setQueue }}>
      {children}
    </playerQueueContext.Provider>
  );
};
