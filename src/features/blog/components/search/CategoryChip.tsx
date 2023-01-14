import React from 'react';
import { Chip } from '@mui/material';

interface CategoryChipProps {
  id: number;
  value: string;
  selected: boolean;
}

export const CategoryChip = ({ id, selected, value }: CategoryChipProps) => (
  <Chip
    key={id}
    label={value}
    sx={{
      p: '0.75em 1.5em',
      height: '42px',
      borderRadius: '9999px',
      cursor: 'pointer',
    }}
    color={selected ? 'primary' : 'default'}
    variant={selected ? 'filled' : 'outlined'}
  />
);
