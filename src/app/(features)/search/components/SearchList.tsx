import { SearchPostModel } from '@domain/uiStates';
import { BlogCommonCardGrid } from '@app/blog/components/common';

interface SearchListProps {
  loading: boolean;
  posts: SearchPostModel[];
  title: string;
}

export const SearchList = ({ posts, loading, title }: SearchListProps) => (
  <BlogCommonCardGrid loading={loading} posts={posts} title={title} />
);
