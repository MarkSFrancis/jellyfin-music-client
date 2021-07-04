import { useContext } from "react";
import { createContext } from "react";
import { ApiClient } from "../../utils/jellyfinClient";

export interface ApiAuthContext {
  serverUrl: string;
  authToken: string;
}

export interface ApiContext {
  auth: ApiAuthContext;
  api: ApiClient;
}

const apiContext = createContext<ApiContext>(undefined);

export const useApi = () => useContext(apiContext);

export const ApiProvider = apiContext.Provider;
