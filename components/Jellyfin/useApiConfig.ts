import { useAppSelector } from '../../store';

export const useApiConfig = () => {
  const config = useAppSelector((state) => state.apiConfigState);

  if (!config) {
    throw new Error('Api config not set');
  }

  return config;
};
