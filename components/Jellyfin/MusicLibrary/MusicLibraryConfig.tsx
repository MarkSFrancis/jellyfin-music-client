import { createContext } from 'react';
import { useContext } from 'react';

export interface Library {
  id: string;
  name: string;
}

export interface MusicLibraryConfigContext {
  library: Library;
}

const musicLibraryConfigContext = createContext<
  MusicLibraryConfigContext | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useMusicLibraryConfig = () => {
  const library = useContext(musicLibraryConfigContext)?.library;

  if (!library) {
    throw new Error('Music library not set');
  }

  return library;
};

export const MusicLibraryConfigProvider = musicLibraryConfigContext.Provider;
