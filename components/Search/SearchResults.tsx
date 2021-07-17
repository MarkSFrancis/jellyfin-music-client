import React, { FC } from "react";
import { LibraryTracks } from "../TracksDisplay";

export interface SearchResultsProps {
  searchFor: string;
}

export const SearchResults: FC<SearchResultsProps> = (props) => {
  return (
    <LibraryTracks
      key={props.searchFor}
      searchTerm={props.searchFor}
      recursive
    />
  );
};
