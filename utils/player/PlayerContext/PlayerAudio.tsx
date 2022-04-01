import { createContext, FC, useContext } from "react";
import { useAudio } from "../useAudio";
import { useAudioLoader } from "../useAudioLoader";
import { Howl } from "howler";

const playerAudioContext = createContext<Howl | undefined>(undefined);

export const usePlayerAudio = () => useContext(playerAudioContext);

export const PlayerAudioProvider: FC = ({ children }) => {
  const currentTracks = useAudioLoader();
  const audio = useAudio(currentTracks);

  return (
    <playerAudioContext.Provider value={audio}>
      {children}
    </playerAudioContext.Provider>
  );
};
