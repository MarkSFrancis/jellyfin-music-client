import { FC, useState, createContext, useContext } from "react";
import { Track } from "../../trackTypes";
import { PlayerCurrentTrackContext } from "./types";

const playerCurrentTrackContext =
  createContext<PlayerCurrentTrackContext>(undefined);

export const usePlayerCurrentTrack = () =>
  useContext(playerCurrentTrackContext);

export const PlayerCurrentTrackProvider: FC = ({ children }) => {
  const [track, setTrack] = useState<Track | undefined>();

  return (
    <playerCurrentTrackContext.Provider value={{ track, setTrack }}>
      {children}
    </playerCurrentTrackContext.Provider>
  );
};
