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
import { SlimPageContainer } from "../../Layout";

export interface SetServerProps {
  onSetServer: (url: string) => void;
}

export const SetServer: FC<SetServerProps> = (props) => {
  const [serverUrl, setServerUrl] = useState<string>();
  const [validating, setValidating] = useState(false);
  const [isValid, setIsValid] = useState<
    PublicSystemInfo | false | undefined
  >();

  useEffect(() => {
    setIsValid(undefined);
  }, [serverUrl]);

  const validateServer = useCallback(async () => {
    setValidating(true);
    const apiClient = initApi(serverUrl, undefined);

    try {
      return await apiClient.system.getPublicSystemInfo().then((r) => {
        if (!r.data.Version) {
          throw new Error("Unrecognised server");
        }

        setIsValid(r.data);
        setValidating(false);
        return true;
      });
    } catch {
      setIsValid(false);
      setValidating(false);
      return false;
    }
  }, [serverUrl]);

  const handleSetServer = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (await validateServer()) {
        props.onSetServer(serverUrl);
      }
    },
    [serverUrl, validateServer, props]
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
              onChange={(e) => setServerUrl(e.target.value)}
            />
          </FormControl>
          <ButtonGroup>
            <Button type="submit" isDisabled={!serverUrl}>
              Connect
            </Button>
            <Button
              isLoading={validating}
              colorScheme="gray"
              variant="outline"
              isDisabled={!serverUrl}
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
