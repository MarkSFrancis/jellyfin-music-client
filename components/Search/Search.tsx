import { NextRouter, useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";

const SEARCH_QUERY_KEY = "q";
const SEARCH_PATH = "/search";

export const Search: FC = () => {
  const router = useRouter();

  const [urlQuery, setUrlQuery] = useState(getSearchUrlValue(router) ?? "");

  useEffect(() => {
    setUrlQuery((q) => getSearchUrlValue(router) ?? q);
  }, [router]);

  const onSubmit = useCallback(
    (query: string) => {
      const searchParams = new URLSearchParams({ [SEARCH_QUERY_KEY]: query });

      if (router.pathname === SEARCH_PATH) {
        router.replace(`${SEARCH_PATH}?${searchParams}`);
      } else {
        router.push(`${SEARCH_PATH}?${searchParams}`);
      }
    },
    [router]
  );

  return <SearchInput onSubmit={onSubmit} urlQuery={urlQuery} />;
};

function getSearchUrlValue(router: NextRouter) {
  if (router.pathname === SEARCH_PATH) {
    const val = router.query[SEARCH_QUERY_KEY];

    if (Array.isArray(val)) {
      return val[0];
    } else {
      return val;
    }
  }

  return undefined;
}
