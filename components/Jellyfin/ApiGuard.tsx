import { Center, Spinner } from "@chakra-ui/react";
import React, { PropsWithChildren, useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useLocalStorage } from "../../utils";
import { ApiClient, initApi } from "../../utils/jellyfinClient";
import { UserGuard } from "./User/UserGuard";
import { SetServer, SignIn } from "./SignIn";
import { MusicLibraryGuard } from "./MusicLibrary";
import { Server, setApiConfig } from "../../utils/apiConfig/apiConfigSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { ApiProvider } from "./ApiContext";

export const ApiGuard: FC<PropsWithChildren> = (props) => {
  const [server, setServer] = useLocalStorage<Server>("jellyfin-server-url");
  const [token, setToken] = useLocalStorage<string>("jellyfin-auth-token");
  const [api, setApi] = useState<ApiClient>();
  const apiConfig = useAppSelector((state) => state.apiConfigState);
  const dispatch = useAppDispatch();

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

    const apiConfig = { authToken: token, server };
    dispatch(setApiConfig(apiConfig));
  }, [server, api, token, dispatch]);

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
    <ApiProvider value={api}>
      <UserGuard onSignOut={() => setToken(undefined)}>
        <MusicLibraryGuard onSignOut={() => setToken(undefined)}>
          {props.children}
        </MusicLibraryGuard>
      </UserGuard>
    </ApiProvider>
  );
};
