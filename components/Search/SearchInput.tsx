import { Search2Icon } from '@chakra-ui/icons';
import { Input, IconButton, HStack } from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useState } from 'react';

export interface SearchInputProps {
  urlQuery: string;
  onSubmit: (searchFor: string) => void;
}

export const SearchInput: FC<SearchInputProps> = (props) => {
  const [searchFor, setSearchFor] = useState(props.urlQuery);

  useEffect(() => setSearchFor(props.urlQuery), [props.urlQuery]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      props.onSubmit(searchFor);
    },
    [props, searchFor]
  );

  return (
    <form onSubmit={handleSubmit}>
      <HStack justifyContent="center" alignItems="center" mb={6}>
        <Input
          flexGrow={1}
          onChange={(e) => setSearchFor(e.target.value)}
          value={searchFor}
          maxW="container.sm"
          placeholder="Search by song title"
        />
        <IconButton aria-label="Search" type="submit">
          <Search2Icon />
        </IconButton>
      </HStack>
    </form>
  );
};
