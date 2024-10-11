import { useContext } from 'react';
import { createContext } from 'react';

export interface PlayerBarContext {
  scrollRef: React.MutableRefObject<HTMLDivElement>;
}

const playerBarContext = createContext<PlayerBarContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayerBar = () => {
  const playerBar = useContext(playerBarContext);

  if (!playerBar) {
    throw new Error('Player bar not set');
  }

  return playerBar;
};

export const PlayerBarProvider = playerBarContext.Provider;
