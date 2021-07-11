import { Center, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useLocalStorage } from "../../utils";
import { ApiClient, initApi } from "../../utils/jellyfinClient";
import { ApiProvider, Server } from "./ApiContext";
import { UserGuard } from "./User/UserGuard";
import { SetServer, SignIn } from "./SignIn";
import { useMemo } from "react";
import { MusicLibraryGuard } from "./MusicLibrary";

export const ApiGuard: FC = (props) => {
  const [server, setServer] = useLocalStorage<Server>("jellyfin-server-url");
  const [token, setToken] = useLocalStorage<string>("jellyfin-auth-token");
  const [api, setApi] = useState<ApiClient>();

  useEffect(() => {
    if (!server || !token) {
      setApi(undefined);
    } else {
      setApi(initApi(server.url, token));
    }
  }, [server, token]);

  const apiConfig = useMemo(() => {
    if (!api || !token || !server) {
      return undefined;
    }

    return { api, auth: { authToken: token, server } };
  }, [server, api, token]);

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
    <ApiProvider value={apiConfig}>
      <UserGuard onSignOut={() => setToken(undefined)}>
        <MusicLibraryGuard onSignOut={() => setToken(undefined)}>
          {props.children}
        </MusicLibraryGuard>
      </UserGuard>
    </ApiProvider>
  );
};
