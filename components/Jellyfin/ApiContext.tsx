import { PublicSystemInfo } from "@jellyfin/client-axios";
import { atom, useRecoilValue } from "recoil";
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

export const apiAtom = atom<ApiContext>({
  key: "api",
  default: undefined,
});

export const useApi = () => useRecoilValue(apiAtom);
