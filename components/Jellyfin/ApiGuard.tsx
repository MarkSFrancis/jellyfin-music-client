import { Center, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useLocalStorage } from "../../utils";
import { ApiClient, initApi } from "../../utils/jellyfinClient";
import { apiAtom, Server } from "./ApiContext";
import { UserGuard } from "./User/UserGuard";
import { SetServer, SignIn } from "./SignIn";
import { MusicLibraryGuard } from "./MusicLibrary";
import { useRecoilState } from "recoil";

export const ApiGuard: FC = (props) => {
  const [server, setServer] = useLocalStorage<Server>("jellyfin-server-url");
  const [token, setToken] = useLocalStorage<string>("jellyfin-auth-token");
  const [api, setApi] = useState<ApiClient>();
  const [apiConfig, setApiConfig] = useRecoilState(apiAtom);

  useEffect(() => {
    if (!server || !token) {
      setApi(undefined);
    } else {
      setApi(initApi(server.url, token));
    }
  }, [server, setApi, token]);

  useEffect(() => {
    if (!api || !token || !server) {
      return undefined;
    }

    const apiConfig = { api, auth: { authToken: token, server } };
    setApiConfig(apiConfig);
  }, [server, api, token, setApiConfig]);

  if (!server) {
    return <SetServer onSetServer={setServer} />;
  }

  if (!token) {
    return (
      <SignIn
        onChangeServer={() => setServer(undefined)}
        server={server}
        onSetToken={setToken}
      />
    );
  }

  if (!apiConfig) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <UserGuard onSignOut={() => setToken(undefined)}>
      <MusicLibraryGuard onSignOut={() => setToken(undefined)}>
        {props.children}
      </MusicLibraryGuard>
    </UserGuard>
  );
};
