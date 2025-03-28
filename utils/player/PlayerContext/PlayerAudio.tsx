import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useAudio } from '../../stream/useAudio';
import { useAudioLoader } from '../../stream/useAudioLoader';
import { Howl } from 'howler';

const playerAudioContext = createContext<Howl | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayerAudio = () => useContext(playerAudioContext);

export const PlayerAudioProvider: FC<PropsWithChildren> = ({ children }) => {
  const currentTracks = useAudioLoader();
  const audio = useAudio(currentTracks);

  return (
    <playerAudioContext.Provider value={audio}>
      {children}
    </playerAudioContext.Provider>
  );
};
