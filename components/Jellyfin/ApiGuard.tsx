import React, { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useLocalStorage } from "../../utils";
import { ApiClient, initApi } from "../../utils/jellyfinClient";
import { ApiProvider } from "./ApiContext";
import { SetServer } from "./SetServer";
import { SignIn } from "./SignIn";

export const ApiGuard: FC = () => {
  const [serverUrl, setServerUrl] = useLocalStorage<string>(
    "jellyfin-server-url"
  );
  const [userId, setUserId] = useLocalStorage<string>("jellyfin-user-id");
  const [api, setApi] = useState<ApiClient>();

  useEffect(() => {
    if (!serverUrl) {
      setApi(undefined);
    } else {
      setApi(initApi(serverUrl));
    }
  }, [serverUrl, userId]);

  if (!serverUrl) {
    return <SetServer onSetServer={setServerUrl} />;
  }

  if (!userId) {
    return <SignIn onChangeServer={() => setServerUrl(undefined)} />;
  }

  if (!api) {
    return <></>;
  }

  return <ApiProvider value={{ api, server: serverUrl }}></ApiProvider>;
};
