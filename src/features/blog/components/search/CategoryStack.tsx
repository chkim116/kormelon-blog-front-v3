import React from 'react';
import { Stack } from '@mui/material';
import { CategoryEntity, SubCategoryEntity } from '@core/entities';
import { CategoryChip } from './CategoryChip';

interface CategoryStackProps {
  categories:
    | CategoryEntity[]
    | Omit<SubCategoryEntity, 'categoryId' | 'posts'>[];
  openId: number;
  onClick: (id: number) => void;
}

export const CategoryStack = ({
  categories,
  openId,
  onClick,
}: CategoryStackProps) => (
  <Stack direction="row" spacing={1} mb={2}>
    {categories.map(({ id, value }) => (
      <CategoryChip
        key={id}
        id={id}
        value={value}
        selected={openId === id}
        onClick={onClick}
      />
    ))}
  </Stack>
);
