import { createContext, useContext, useCallback, FC, useState } from "react";
import { PlayerSettingsContext } from "./types";

const playerSettingsContext = createContext<PlayerSettingsContext>(undefined);
export const usePlayerSettings = () => useContext(playerSettingsContext);

export const PlayerSettingsProvider: FC = ({ children }) => {
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [repeating, setRepeating] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  const toggleMuted = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  const toggleRepeating = useCallback(() => {
    setRepeating((r) => !r);
  }, []);

  const toggleShuffling = useCallback(() => {
    setShuffling((s) => !s);
  }, []);

  return (
    <playerSettingsContext.Provider
      value={{
        volume,
        setVolume,
        muted,
        toggleMuted,
        repeating,
        toggleRepeating,
        shuffling,
        toggleShuffling,
      }}
    >
      {children}
    </playerSettingsContext.Provider>
  );
};
