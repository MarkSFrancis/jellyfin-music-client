import React, { FC, FormEvent } from 'react';
import { SlimPageContainer } from '../../Layout/SlimPageContainer';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Library } from './MusicLibraryConfig';

export interface SelectMusicLibraryProps {
  libraries: Library[] | undefined;
  onSubmit: (library: Library) => void;
  onSignOut: () => void;
}

export const SelectMusicLibrary: FC<SelectMusicLibraryProps> = (props) => {
  const [libraryId, setLibraryId] = useState<string>();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const library = props.libraries.find((l) => l.id === libraryId);
      if (library) {
        props.onSubmit(library);
      }
    },
    [props, libraryId]
  );

  if (props.libraries.length === 0) {
    return (
      <SlimPageContainer>
        <Text>
          We couldn&apos;t find a music library. Please make sure you&apos;ve
          configured a music library on this Jellyfin server
        </Text>
      </SlimPageContainer>
    );
  }

  return (
    <SlimPageContainer>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2">Choose a music library</Heading>
          <FormControl isRequired>
            <FormLabel>Music library</FormLabel>
            <Select
              placeholder="Select a library"
              value={libraryId}
              onChange={(e) => setLibraryId(e.target.value)}
            >
              {props.libraries.map((l) => (
                <option value={l.id} key={l.id}>
                  {l.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <ButtonGroup>
            <Button type="submit">Select library</Button>
            <Button
              colorScheme="gray"
              variant="outline"
              onClick={() => props.onSignOut()}
            >
              Sign out
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </SlimPageContainer>
  );
};
