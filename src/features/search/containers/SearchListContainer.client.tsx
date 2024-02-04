'use client';
import { useQueryPush } from '@shared/hooks/useQueryPush';
import { BlogCommonPagination } from '@features/blog/components/common/BlogCommonPagination';
import { BlogSearchUiState } from '@features/blog/domains/search/blogSearch.uiState';
import { SearchList } from '../components/SearchList';

interface SearchListContainerClientProps {
  blogs: BlogSearchUiState[];
  keyword: string;
  page: number;
  total: number;
  totalPage: number;
}

export const SearchListContainerClient = ({
  keyword,
  page,
  blogs,
  total,
  totalPage,
}: SearchListContainerClientProps) => {
  const navigate = useQueryPush();

  const handleChange = (page: number) => {
    navigate({ page });
  };

  return (
    <>
      <SearchList
        title={`${keyword} 검색 결과 : ${total}개의 게시글`}
        posts={blogs}
      />

      {total > 0 && (
        <BlogCommonPagination
          page={page}
          total={totalPage}
          onChange={handleChange}
        />
      )}
    </>
  );
};
