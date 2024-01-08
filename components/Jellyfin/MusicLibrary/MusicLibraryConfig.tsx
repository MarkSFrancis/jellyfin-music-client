import { createContext } from "react";
import { useContext } from "react";

export interface Library {
  id: string;
  name: string;
}

export interface MusicLibraryConfigContext {
  library: Library;
}

const musicLibraryConfigContext =
  createContext<MusicLibraryConfigContext>(undefined);

export const useMusicLibraryConfig = () =>
  useContext(musicLibraryConfigContext)?.library;

export const MusicLibraryConfigProvider = musicLibraryConfigContext.Provider;
