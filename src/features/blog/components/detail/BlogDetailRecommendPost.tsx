import { BlogSearchUiState } from '@features/blog/domains/search/blogSearch.uiState';
import { BlogCommonCardGrid } from '../common/BlogCommonCardGrid';

interface BlogDetailRecommendPostProps {
  posts: BlogSearchUiState[];
}

export const BlogDetailRecommendPost = ({
  posts,
}: BlogDetailRecommendPostProps) =>
  posts.length > 0 ? (
    <div className="py-12 sm:py-16 lg:py-20">
      <BlogCommonCardGrid blogs={posts} title="More" />
    </div>
  ) : (
    <></>
  );
