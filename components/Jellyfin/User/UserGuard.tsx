import { Button, Center, Spinner, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useCallback } from "react";
import { useMutation, useQuery } from "../../../utils";
import { UserProvider } from "./UserContext";

export interface GetUserDetailsProps {
  onSignOut: () => void;
}

export const UserGuard: FC<GetUserDetailsProps> = (props) => {
  const [getUserState] = useQuery("user", "getCurrentUser", []);
  const [signOut, signOutState] = useMutation("session", "reportSessionEnded");

  const handleSignOut = useCallback(async () => {
    await signOut([]);
    props.onSignOut();
  }, [signOut, props]);

  if (
    getUserState.status === "loading" ||
    signOutState.status === "loading" ||
    signOutState.status === "error"
  ) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (getUserState.status === "error") {
    return (
      <Text>
        Something went wrong getting user details. Please{" "}
        <Button variant="link" onClick={() => handleSignOut()}>
          sign out
        </Button>{" "}
        and try again
      </Text>
    );
  }

  return (
    <UserProvider value={getUserState.data}>{props.children}</UserProvider>
  );
};
