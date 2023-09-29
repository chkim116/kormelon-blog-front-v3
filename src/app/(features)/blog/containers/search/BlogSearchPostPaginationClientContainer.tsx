'use client';
import { refineBlogPostSearchParamsModel } from '@domain/manipulates';
import { useQueryParser, useQueryPush } from '@shared/hooks';
import { useAppSelector } from '@shared/stores';
import { selBlogPostTotalPage } from '@app/blog/stores';
import { BlogCommonPagination } from '@app/blog/components/common';

export function BlogSearchPostPaginationClientContainer() {
  const params = useQueryParser(refineBlogPostSearchParamsModel);
  const router = useQueryPush();

  const totalPage = useAppSelector(selBlogPostTotalPage);

  const handleChangePage = (page: number) => {
    router({ page });
  };

  return (
    <>
      {totalPage > 0 && (
        <BlogCommonPagination
          total={totalPage}
          page={params.page}
          onChange={handleChangePage}
        />
      )}
    </>
  );
}
