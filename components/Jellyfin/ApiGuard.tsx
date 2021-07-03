import { Center, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useLocalStorage } from "../../utils";
import { ApiClient, initApi } from "../../utils/jellyfinClient";
import { ApiProvider } from "./ApiContext";
import { UserGuard } from "./UserGuard";
import { SetServer } from "./SetServer";
import { SignIn } from "./SignIn";

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

  if (!api) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <ApiProvider value={{ api }}>
      <UserGuard onSignOut={() => setToken(undefined)}>
        {props.children}
      </UserGuard>
    </ApiProvider>
  );
};
