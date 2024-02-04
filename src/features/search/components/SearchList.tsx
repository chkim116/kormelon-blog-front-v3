import { BlogCommonCardGrid } from '@features/blog/components/common/BlogCommonCardGrid';
import { BlogSearchUiState } from '@features/blog/domains/search/blogSearch.uiState';

interface SearchListProps {
  posts: BlogSearchUiState[];
  title: string;
}

export const SearchList = ({ posts, title }: SearchListProps) => (
  <BlogCommonCardGrid blogs={posts} title={title} />
);
