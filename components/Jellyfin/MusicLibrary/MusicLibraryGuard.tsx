import { Center, Spinner, Text } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";
import { useMemo } from "react";
import { SlimPageContainer } from "../../Layout";
import { MusicLibraryConfigProvider } from "./MusicLibraryContext";
import { SelectMusicLibrary } from "./SelectMusicLibrary";
import { getMusicLibraries, useLibraries } from "./useLibraries";
import { useStoredMusicLibrary } from "./useStoredMusicLibrary";

export interface MusicLibraryGuardProps {
  onSignOut: () => void;
}

export const MusicLibraryGuard: FC<
  PropsWithChildren<MusicLibraryGuardProps>
> = (props) => {
  const state = useLibraries();
  const [library, setLibrary] = useStoredMusicLibrary(state);

  const libraryMemo = useMemo(() => ({ library }), [library]);

  if (library) {
    return (
      <MusicLibraryConfigProvider value={libraryMemo}>
        {props.children}
      </MusicLibraryConfigProvider>
    );
  }

  if (state.status === "error") {
    return (
      <SlimPageContainer>
        <Text>Something went wrong fetching your music libraries</Text>
      </SlimPageContainer>
    );
  }

  if (state.status === "loading") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const libraries = getMusicLibraries(state);

  return (
    <SelectMusicLibrary
      libraries={libraries}
      onSubmit={setLibrary}
      onSignOut={props.onSignOut}
    />
  );
};
