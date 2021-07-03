import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AuthenticationResult } from "@jellyfin/client-axios";
import React, { FC, FormEvent } from "react";
import { useCallback } from "react";
import { AuthContainer } from "./AuthContainer";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { initApi } from "../../utils/jellyfinClient";

export interface SignInProps {
  serverUrl: string;
  onChangeServer: () => void;
  onSetToken: (token: string) => void;
}

export const SignIn: FC<SignInProps> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Jellyfin requires a temporary token to sign in
      const tempToken = createToken(undefined);
      const api = initApi(props.serverUrl, tempToken);

      try {
        const authResponse = await api.user.authenticateUserByName({
          authenticateUserByName: {
            Username: username,
            Pw: password,
          },
        });

        const token = createToken(authResponse.data);
        props.onSetToken(token);
      } catch (ex) {
        console.error(ex);
        setError("Login failed. Please check your username and password");
      }
    },
    [props, username, password]
  );

  return (
    <AuthContainer>
      <form onSubmit={signIn}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired id="username">
            <FormLabel>Username</FormLabel>
            <Input
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired id="password">
            <FormLabel>Password</FormLabel>
            <Input
              autoComplete="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <ButtonGroup>
            <Button type="submit">Login</Button>
            <Button colorScheme="gray" onClick={() => props.onChangeServer()}>
              Change server
            </Button>
          </ButtonGroup>
          {error && (
            <Box>
              <Text color="red">{error}</Text>
            </Box>
          )}
        </VStack>
      </form>
    </AuthContainer>
  );
};

const createToken = (authResult: AuthenticationResult) => {
  const clientName = "Jellyfin Music Client";
  const deviceName = "Unknown"; // Could be replaced with a friendly name (like Android or Chrome)
  const deviceId = uuidv4();
  const clientVersion = "0.0.0"; // Could pull this from package.json, or some sort of release version

  const token = `MediaBrowser Client="${clientName}", Device="${deviceName}", DeviceId="${deviceId}", Version="${clientVersion}", Token="${
    authResult?.AccessToken ?? ""
  }"`;

  return token;
};
