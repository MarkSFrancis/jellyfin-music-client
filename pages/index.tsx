import React from "react";
import { Dashboard } from "../components/Dashboard";
import { PageContainer } from "../components/Layout";
import { Search } from "../components/Search";

export default function LibraryPage() {
  return (
    <PageContainer>
      <Search />
      <Dashboard />
    </PageContainer>
  );
}
