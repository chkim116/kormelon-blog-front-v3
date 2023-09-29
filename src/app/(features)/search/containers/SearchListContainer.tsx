import { useAppSelector } from '@shared/stores';
import { BlogPostSearchParamsModel } from '@domain/uiStates';
import { useQueryPush } from '@shared/hooks';
import { BlogCommonPagination } from '@app/blog/components/common';
import { SearchList } from '../components';
import {
  selSearchTotalPage,
  selSearchPostLoading,
  selSearchPosts,
  selSearchTotal,
} from '../stores';

interface SearchListContainerProps {
  params: BlogPostSearchParamsModel;
}

export const SearchListContainer = ({ params }: SearchListContainerProps) => {
  const posts = useAppSelector(selSearchPosts);
  const total = useAppSelector(selSearchTotal);
  const totalPage = useAppSelector(selSearchTotalPage);
  const loading = useAppSelector(selSearchPostLoading);

  const navigate = useQueryPush();

  const handleChange = (page: number) => {
    navigate({ page });
  };

  return (
    <>
      <SearchList
        title={`${params.keyword} 검색 결과 : ${total}개의 게시글`}
        posts={posts}
        loading={loading}
      />

      {total > 0 && (
        <BlogCommonPagination
          page={params.page}
          total={totalPage}
          onChange={handleChange}
        />
      )}
    </>
  );
};
