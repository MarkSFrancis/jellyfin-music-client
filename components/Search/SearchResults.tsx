import React, { FC } from "react";
import { LazyDisplay, TracksDisplay } from "../TracksDisplay";
import { useSearch } from "./useSearch";

export interface SearchResultsProps {
  searchFor: string;
}

export const SearchResults: FC<SearchResultsProps> = (props) => {
  const { allResults, state } = useSearch(props);

  return (
    <LazyDisplay
      loadedCount={allResults.length}
      getPageStatus={state.status}
      onGetPage={() => void 0}
      totalItems={allResults.length}
    >
      <TracksDisplay key="tracks" tracks={allResults} />
    </LazyDisplay>
  );
};
