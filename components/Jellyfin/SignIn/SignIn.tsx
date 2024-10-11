import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { FC, FormEvent } from 'react';
import { useCallback } from 'react';
import { SlimPageContainer } from '../../Layout/SlimPageContainer';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { initApi } from '../../../utils/jellyfinClient';
import { Server } from '../../../utils/apiConfig/apiConfigSlice';
import { AuthenticationResult } from '@jellyfin/sdk/lib/generated-client/models';

export interface SignInProps {
  server: Server;
  onChangeServer: () => void;
  onSetToken: (token: string) => void;
}

export const SignIn: FC<SignInProps> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Jellyfin requires a temporary token to sign in
      const tempToken = createToken(undefined);
      const api = initApi(props.server.url, tempToken);

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
        setError('Login failed. Please check your username and password');
      }
    },
    [props, username, password]
  );

  return (
    <SlimPageContainer>
      <form onSubmit={signIn}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2">Sign in</Heading>
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
            <Button
              colorScheme="gray"
              onClick={() => props.onChangeServer()}
              variant="outline"
            >
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
    </SlimPageContainer>
  );
};

const createToken = (authResult: AuthenticationResult | undefined) => {
  const clientName = 'Jellyfin Music Client';
  const deviceName = 'Unknown'; // Could be replaced with a friendly name (like Android or Chrome)
  const deviceId = uuidv4();
  const clientVersion = '0.0.0'; // Could pull this from package.json, or some sort of release version

  const token = `MediaBrowser Client="${clientName}", Device="${deviceName}", DeviceId="${deviceId}", Version="${clientVersion}", Token="${
    authResult?.AccessToken ?? ''
  }"`;

  return token;
};
