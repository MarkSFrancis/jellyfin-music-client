import { Code } from "@chakra-ui/react";
import { ItemFields } from "@jellyfin/client-axios";
import React from "react";
import { useMemo } from "react";
import { useMusicLibraryConfig } from "../components/Jellyfin";
import { useUser } from "../components/Jellyfin/User/UserContext";
import { useQuery } from "../utils";

export default function Library() {
  const user = useUser();
  const musicLibrary = useMusicLibraryConfig();

  const [state] = useQuery("items", "getItems", [
    {
      userId: user.Id,
      recursive: true,
      parentId: musicLibrary.id,
      limit: 10, // TODO Consider using limit for better performance / pagination
      sortBy: ItemFields.DateCreated,
      sortOrder: "Descending",
      fields: [
        ItemFields.CanDelete,
        ItemFields.CanDownload,
        ItemFields.CustomRating,
        ItemFields.DateCreated,
        ItemFields.Etag,
        ItemFields.Genres,
        ItemFields.MediaSources,
        ItemFields.Path,
        ItemFields.Tags,
        ItemFields.MediaStreams,
      ],
    },
  ]);

  const data = useMemo(
    () => JSON.stringify(state.data ?? state.error, undefined, 2),
    [state]
  );

  return (
    <>
      <pre>
        <Code>Total items: {state.data?.Items?.length}</Code>
      </pre>
      <pre>
        <Code>{data}</Code>
      </pre>
    </>
  );
}
