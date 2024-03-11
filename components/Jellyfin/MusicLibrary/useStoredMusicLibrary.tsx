import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { QueryState, useLocalStorage } from "../../../utils";
import { Library } from "./MusicLibraryConfig";
import { getMusicLibraries } from "./useLibraries";
import { BaseItemDtoQueryResult } from "@jellyfin/sdk/lib/generated-client/models";

export const useStoredMusicLibrary = (
  state: QueryState<BaseItemDtoQueryResult>
) => {
  const [library, setLibrary] = useLocalStorage<Library>(
    "jellyfin-music-library-id"
  );

  // The library for the app to use, after validating against the server's libraries
  const [validLibrary, setValidLibrary] = useState<Library>();

  useEffect(() => {
    if (state.status !== "success") {
      setValidLibrary(undefined);
    }

    const libraries = getMusicLibraries(state);

    if (library && libraries?.find((l) => l.id === library.id)) {
      setValidLibrary(library);
    } else if (libraries?.length === 1) {
      setValidLibrary(libraries[0]);
    } else {
      setValidLibrary(undefined);
    }
  }, [setLibrary, state, library]);

  const changeLibrary = useCallback(
    (library: Library) => {
      setLibrary(library);
    },
    [setLibrary]
  );

  return [validLibrary, changeLibrary] as const;
};
