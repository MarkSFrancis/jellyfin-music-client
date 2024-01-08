import React, { FormEvent, useCallback } from "react";
import { FC } from "react";
import { useState } from "react";
import { initApi } from "../../../utils/jellyfinClient";
import {
  Button,
  ButtonGroup,
  FormControl,
  Text,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { PublicSystemInfo } from "@jellyfin/client-axios";
import { useEffect } from "react";
import { SlimPageContainer } from "../../Layout/SlimPageContainer";
import { Server } from "../../../utils/apiConfig/apiConfigSlice";

export interface SetServerProps {
  onSetServer: (server: Server) => void;
}

export const SetServer: FC<SetServerProps> = (props) => {
  const [server, setServer] = useState<string>();
  const [validating, setValidating] = useState(false);
  const [isValid, setIsValid] = useState<
    PublicSystemInfo | false | undefined
  >();

  useEffect(() => {
    setIsValid(undefined);
  }, [server]);

  const validateServer = useCallback(async () => {
    setValidating(true);
    const apiClient = initApi(server, undefined);

    try {
      return await apiClient.system.getPublicSystemInfo().then((r) => {
        if (!r.data.Version) {
          throw new Error("Unrecognised server");
        }

        setIsValid(r.data);
        setValidating(false);
        return r.data;
      });
    } catch {
      setIsValid(false);
      setValidating(false);
      return false;
    }
  }, [server]);

  const handleSetServer = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const serverInfo = await validateServer();
      if (!serverInfo) return;

      props.onSetServer({ url: server, ...serverInfo });
    },
    [server, validateServer, props]
  );

  return (
    <SlimPageContainer>
      <form onSubmit={handleSetServer}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2">Connect to your Jellyfin server</Heading>
          <FormControl isRequired id="serverUrl">
            <FormLabel>Server URL</FormLabel>
            <Input
              placeholder="https://my-jellyfin-server.com"
              onChange={(e) => setServer(e.target.value)}
            />
          </FormControl>
          <ButtonGroup>
            <Button type="submit" isDisabled={!server}>
              Connect
            </Button>
            <Button
              isLoading={validating}
              colorScheme="gray"
              variant="outline"
              isDisabled={!server}
              onClick={validateServer}
            >
              Test connection
            </Button>
          </ButtonGroup>
          {isValid && <Text>Jellyfin version detected: {isValid.Version}</Text>}
          {isValid === false && <Text>Failed to validate Jellyfin server</Text>}
        </VStack>
      </form>
    </SlimPageContainer>
  );
};
