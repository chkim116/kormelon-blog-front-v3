import React from 'react';
import { Chip } from '@mui/material';

interface CategoryChipProps {
  id: number;
  value: string;
  selected: boolean;
  onClick: (id: number) => void;
}

export const CategoryChip = ({
  id,
  selected,
  value,
  onClick,
}: CategoryChipProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <Chip
      key={id}
      label={value}
      sx={{
        p: '0.75em 1.5em',
        height: '42px',
        borderRadius: '9999px',
      }}
      color={selected ? 'primary' : 'default'}
      variant={selected ? 'filled' : 'outlined'}
      onClick={handleClick}
    />
  );
};
