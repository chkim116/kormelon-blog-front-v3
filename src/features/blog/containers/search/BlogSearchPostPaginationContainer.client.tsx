'use client';
import { BlogCommonPagination } from '@features/blog/components/common/BlogCommonPagination';
import { useQueryPush } from '@shared/hooks/useQueryPush';

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
