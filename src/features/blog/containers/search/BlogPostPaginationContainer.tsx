import { useCallback, useMemo } from 'react';
import { useAppSelector } from '@common/store';
import { useQueryPush } from '@shared/hooks/useQueryPush';

import { DEFAULT_PAGE, DEFAULT_PER } from '@common/constants';
import { PostPagination } from '@features/blog/components/search/PostPagination';
import {
  selBlogPostSearchParams,
  selBlogPostTotalCount,
} from '@features/blog/stores';

export const BlogPostPaginationContainer = () => {
  const navigate = useQueryPush();
  const { page = DEFAULT_PAGE, per = DEFAULT_PER } = useAppSelector(
    selBlogPostSearchParams,
  );
  const total = useAppSelector(selBlogPostTotalCount);
  const count = useMemo(() => Math.ceil(total / per), [total, per]);

  const handleChange = useCallback(
    (page: number) => {
      navigate({ page: String(page) }, false);
    },
    [navigate],
  );

  return <PostPagination onChange={handleChange} count={count} page={page} />;
};
