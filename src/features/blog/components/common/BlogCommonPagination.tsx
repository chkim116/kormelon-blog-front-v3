'use client';
import React from 'react';
import { Pagination } from '@nextui-org/react';

interface BlogCommonPaginationProps {
  total: number;
  page: number;
  onChange: (page: number) => void;
}

export function BlogCommonPagination({
  total,
  page,
  onChange,
}: BlogCommonPaginationProps) {
  if (0 >= total) {
    return;
  }

  return (
    <div className="py-12 pb-20 flex justify-center">
      <Pagination
        size="sm"
        siblings={2}
        total={total}
        page={page}
        onChange={onChange}
      />
    </div>
  );
}
