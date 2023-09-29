import React, { ReactNode } from 'react';

interface SearchPageLayoutProps {
  children: ReactNode;
}

const SearchPageLayout = ({ children }: SearchPageLayoutProps) => (
  <section className="max-w-6xl w-full mx-auto p-10">{children}</section>
);

export default SearchPageLayout;
