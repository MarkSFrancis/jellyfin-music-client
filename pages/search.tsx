import { useRouter } from 'next/router';
import React from 'react';
import { PageContainer } from '../components/Layout/PageContainer';
import { Search, SearchResults } from '../components/Search';

export default function SearchPage() {
  const router = useRouter();

  const searchQuery = router.query.q as string;

  return (
    <PageContainer>
      <Search />
      <SearchResults key={searchQuery} searchFor={searchQuery} />
    </PageContainer>
  );
}
