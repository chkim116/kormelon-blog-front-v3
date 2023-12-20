'use client';
import { useQueryPush } from '@shared/hooks/useQueryPush';
import { BlogCommonPagination } from '@features/blog/components/common/BlogCommonPagination';

interface BlogSearchPostPaginationContainerClientProps {
  totalPage: number;
  page: number;
}

export function BlogSearchPostPaginationContainerClient({
  totalPage,
  page,
}: BlogSearchPostPaginationContainerClientProps) {
  const router = useQueryPush();

  const handleChangePage = (page: number) => {
    router({ page });
  };

  return (
    <>
      {totalPage > 0 && (
        <BlogCommonPagination
          total={totalPage}
          page={page}
          onChange={handleChangePage}
        />
      )}
    </>
  );
}
