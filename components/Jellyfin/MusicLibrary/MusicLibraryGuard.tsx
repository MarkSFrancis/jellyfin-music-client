import { Center, Spinner, Text } from '@chakra-ui/react';
import React, { FC, PropsWithChildren } from 'react';
import { SlimPageContainer } from '../../Layout/SlimPageContainer';
import { MusicLibraryConfigProvider } from './MusicLibraryConfig';
import { SelectMusicLibrary } from './SelectMusicLibrary';
import { getMusicLibraries, useLibraries } from './useLibraries';
import { useStoredMusicLibrary } from './useStoredMusicLibrary';

export interface MusicLibraryGuardProps extends PropsWithChildren {
  onSignOut: () => void;
}

export const MusicLibraryGuard: FC<MusicLibraryGuardProps> = (props) => {
  const state = useLibraries();
  const libraries = getMusicLibraries(state);
  const [library, setLibrary] = useStoredMusicLibrary(state);

  if (library) {
    return (
      <MusicLibraryConfigProvider value={library}>
        {props.children}
      </MusicLibraryConfigProvider>
    );
  }

  if (state.status === 'error' || !libraries) {
    return (
      <SlimPageContainer>
        <Text>Something went wrong fetching your music libraries</Text>
      </SlimPageContainer>
    );
  }

  if (state.status === 'loading') {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <SelectMusicLibrary
      libraries={libraries}
      onSubmit={setLibrary}
      onSignOut={props.onSignOut}
    />
  );
};
