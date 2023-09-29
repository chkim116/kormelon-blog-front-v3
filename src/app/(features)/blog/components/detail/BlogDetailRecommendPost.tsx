import { BlogPostModel } from '@domain/uiStates';
import { BlogCommonCardGrid } from '../common';

interface BlogDetailRecommendPostProps {
  posts: BlogPostModel[];
}

export const BlogDetailRecommendPost = ({
  posts,
}: BlogDetailRecommendPostProps) =>
  posts.length > 0 ? (
    <div className="py-12 sm:py-16 lg:py-20">
      <BlogCommonCardGrid posts={posts} loading={false} title="More" />
    </div>
  ) : (
    <></>
  );
