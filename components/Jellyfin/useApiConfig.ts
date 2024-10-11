import { useAppSelector } from '../../store';

export const useApiConfig = () =>
  useAppSelector((state) => state.apiConfigState);
