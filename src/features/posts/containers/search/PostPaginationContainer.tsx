import { useCallback, useMemo } from 'react';
import { useAppSelector } from '@common/store';
import { useQueryPush } from '@shared/hooks/useQueryPush';

import { DEFAULT_PAGE, DEFAULT_PER } from '@common/constants';
import { PostPagination } from '@features/posts/components/search/PostPagination';
import { selPostSearchParams, selPostTotalCount } from '@features/posts/stores';

export const PostPaginationContainer = () => {
  const navigate = useQueryPush();
  const { page = DEFAULT_PAGE, per = DEFAULT_PER } =
    useAppSelector(selPostSearchParams);
  const total = useAppSelector(selPostTotalCount);
  const count = useMemo(() => Math.ceil(total / per), [total, per]);

  const handleChange = useCallback(
    (page: number) => {
      navigate({ page: String(page) }, false);
    },
    [navigate],
  );

  return <PostPagination onChange={handleChange} count={count} page={page} />;
};
