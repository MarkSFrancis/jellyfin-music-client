import { createContext, useContext, FC } from "react";
import { PlayerAudioContext } from "./types";
import { useAudio } from "../useAudio";
import { useAudioLoader } from "../useAudioLoader";

const playerAudioContext = createContext<PlayerAudioContext>(undefined);

export const usePlayerAudio = () => useContext(playerAudioContext);

export const PlayerAudioProvider: FC = ({ children }) => {
  const currentTracks = useAudioLoader();
  const audio = useAudio(currentTracks);

  return (
    <playerAudioContext.Provider value={audio ?? {}}>
      {children}
    </playerAudioContext.Provider>
  );
};
