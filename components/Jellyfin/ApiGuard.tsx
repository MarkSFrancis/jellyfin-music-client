import { Center, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useLocalStorage } from "../../utils";
import { ApiClient, initApi } from "../../utils/jellyfinClient";
import { ApiProvider } from "./ApiContext";
import { UserGuard } from "./User/UserGuard";
import { SetServer, SignIn } from "./SignIn";
import { useMemo } from "react";
import { MusicLibraryGuard } from "./MusicLibrary";

export const ApiGuard: FC = (props) => {
  const [serverUrl, setServerUrl] = useLocalStorage<string>(
    "jellyfin-server-url"
  );
  const [token, setToken] = useLocalStorage<string>("jellyfin-auth-token");
  const [api, setApi] = useState<ApiClient>();

  useEffect(() => {
    if (!serverUrl || !token) {
      setApi(undefined);
    } else {
      setApi(initApi(serverUrl, token));
    }
  }, [serverUrl, token]);

  const apiConfig = useMemo(() => {
    if (!api || !token || !serverUrl) {
      return undefined;
    }

    return { api, auth: { authToken: token, serverUrl: serverUrl } };
  }, [serverUrl, api, token]);

  if (!serverUrl) {
    return <SetServer onSetServer={setServerUrl} />;
  }

  if (!token) {
    return (
      <SignIn
        onChangeServer={() => setServerUrl(undefined)}
        serverUrl={serverUrl}
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
