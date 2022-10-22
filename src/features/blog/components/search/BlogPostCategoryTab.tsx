import React from 'react';
import { Tab } from '@mui/material';
import { CategoryEntity } from '@core/entities';

interface BlogPostCategoryTabProps {
  categories: CategoryEntity[];
}

export const BlogPostCategoryTab = ({
  categories,
}: BlogPostCategoryTabProps) => (
  <>
    {categories.map((category) => (
      <Tab
        key={category.id}
        label={category.value}
        value={category.id.toString()}
      />
    ))}
  </>
);
