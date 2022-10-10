import { ChangeEvent } from 'react';
import { Pagination } from '@mui/material';
import { Stack } from '@mui/system';

interface PostPaginationProps {
  onChange: (page: number) => void;
  page: number;
  count: number;
}

export const PostPagination = ({
  count,
  onChange,
  page,
}: PostPaginationProps) => {
  const handleChange = (_: ChangeEvent<unknown>, newPage: number) => {
    if (newPage === page) {
      return;
    }

    onChange(newPage);
  };

  if (!count) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Pagination
        sx={{
          my: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
        onChange={handleChange}
        page={page}
        count={count}
        size="small"
      />
    </Stack>
  );
};
