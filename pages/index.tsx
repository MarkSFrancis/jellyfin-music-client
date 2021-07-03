import { Code } from "@chakra-ui/react";
import React from "react";
import { useMemo } from "react";
import { useUser } from "../components/Jellyfin/UserContext";
import { useQuery } from "../utils";

export default function Home() {
  const user = useUser();

  const [state] = useQuery("items", "getItems", [
    {
      userId: user.Id,
      recursive: true,
    },
  ]);

  const data = useMemo(
    () => JSON.stringify(state.data ?? state.error, undefined, 2),
    [state]
  );

  return (
    <>
      <pre>
        <Code>{data}</Code>
      </pre>
    </>
  );
}
