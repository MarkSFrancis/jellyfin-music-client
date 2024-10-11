import { useContext } from 'react';
import { createContext } from 'react';
import { ApiClient } from '../../utils/jellyfinClient';

const apiContext = createContext<ApiClient | undefined>(undefined);

export const ApiProvider = apiContext.Provider;

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = () => {
  const api = useContext(apiContext);

  if (!api) {
    throw new Error('Api not set');
  }

  return api;
};
