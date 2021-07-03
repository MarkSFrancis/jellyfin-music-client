import { useContext } from "react";
import { createContext } from "react";
import { ApiClient } from "../../utils/jellyfinClient";

export interface Auth {
  api: ApiClient;
}

const apiContext = createContext<Auth>(undefined);

export const useApi = () => useContext(apiContext);

export const ApiProvider = apiContext.Provider;
