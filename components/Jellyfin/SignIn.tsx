import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { AuthContainer } from "./AuthContainer";

export interface SignInProps {
  onChangeServer: () => void;
}

export const SignIn: FC<SignInProps> = (props) => {
  return (
    <AuthContainer>
      <form>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired id="username">
            <FormLabel>Username</FormLabel>
            <Input autoComplete="username"></Input>
          </FormControl>
          <FormControl isRequired id="password">
            <FormLabel>Password</FormLabel>
            <Input autoComplete="password" type="password"></Input>
          </FormControl>
          <FormControl id="rememberMe">
            <Checkbox>Remember me</Checkbox>
          </FormControl>
          <ButtonGroup>
            <Button type="submit">Login</Button>
            <Button colorScheme="gray" onClick={() => props.onChangeServer()}>
              Change server
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </AuthContainer>
  );
};
