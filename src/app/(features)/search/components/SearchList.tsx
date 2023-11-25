import { BlogSearchUiState } from '@domain/blog/search/blogSearch.uiState';
import { BlogCommonCardGrid } from '@app/blog/components/common/BlogCommonCardGrid';

interface SearchListProps {
  posts: BlogSearchUiState[];
  title: string;
}

export const SearchList = ({ posts, title }: SearchListProps) => (
  <BlogCommonCardGrid blogs={posts} title={title} />
);
