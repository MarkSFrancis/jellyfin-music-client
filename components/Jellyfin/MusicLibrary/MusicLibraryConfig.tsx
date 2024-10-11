import { createContext } from 'react';
import { useContext } from 'react';

export interface Library {
  id: string | null | undefined;
  name: string | null | undefined;
}

const musicLibraryConfigContext = createContext<Library | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useMusicLibraryConfig = () => {
  const library = useContext(musicLibraryConfigContext);

  if (!library) {
    throw new Error('Music library not set');
  }

  return library;
};

export const MusicLibraryConfigProvider = musicLibraryConfigContext.Provider;
