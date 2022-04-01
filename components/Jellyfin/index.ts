import { useAppSelector } from "../../store";
export { ApiGuard } from "./ApiGuard";
export { useApi } from "./ApiContext";
export * from "./MusicLibrary";

export const useApiConfig = () =>
  useAppSelector((state) => state.apiConfigState);
