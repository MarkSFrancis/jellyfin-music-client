import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";
import { SearchInput } from "./SearchInput";

export const Search: FC = () => {
  const router = useRouter();

  const onSubmit = useCallback(
    (query: string) => {
      const searchParams = new URLSearchParams({ q: query });

      router.push(`/search?${searchParams}`);
    },
    [router]
  );

  return <SearchInput onSubmit={onSubmit} />;
};
