import { Button, Center, Spinner, Text } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "../../../utils";
import { userAtom } from "./UserContext";

export interface GetUserDetailsProps {
  onSignOut: () => void;
}

export const UserGuard: FC<GetUserDetailsProps> = (props) => {
  const [getUserState] = useQuery("user", "getCurrentUser", []);
  const [signOut, signOutState] = useMutation("session", "reportSessionEnded");
  const [user, setUser] = useRecoilState(userAtom);

  const handleSignOut = useCallback(async () => {
    await signOut([]);
    props.onSignOut();
  }, [signOut, props]);

  useEffect(() => {
    setUser(getUserState.data);
  }, [setUser, getUserState]);

  if (
    getUserState.status === "loading" ||
    (getUserState.data && !user) ||
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

  return <>{props.children}</>;
};
