import { PublicSystemInfo } from "@jellyfin/client-axios";
import { useContext } from "react";
import { createContext } from "react";
import { ApiClient } from "../../utils/jellyfinClient";

export interface Server extends PublicSystemInfo {
  url: string;
}

export interface ApiAuthContext {
  server: Server;
  authToken: string;
}

export interface ApiContext {
  auth: ApiAuthContext;
  api: ApiClient;
}

const apiContext = createContext<ApiContext>(undefined);

export const useApi = () => useContext(apiContext);

export const ApiProvider = apiContext.Provider;
