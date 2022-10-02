import React, { ReactNode } from 'react';

interface CategoryListProps {
  children: ReactNode;
}

export const CategoryList = ({ children }: CategoryListProps) => (
  <div>{children}</div>
);
