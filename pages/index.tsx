import React from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { PageContainer } from "../components/Layout/PageContainer";
import { Search } from "../components/Search";

export default function LibraryPage() {
  return (
    <PageContainer>
      <Search />
      <Dashboard />
    </PageContainer>
  );
}
