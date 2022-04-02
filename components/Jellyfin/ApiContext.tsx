import { useContext } from "react";
import { createContext } from "react";
import { ApiClient } from "../../utils/jellyfinClient";

const apiContext = createContext<ApiClient>(undefined);

export const ApiProvider = apiContext.Provider;

export const useApi = () => useContext(apiContext);
