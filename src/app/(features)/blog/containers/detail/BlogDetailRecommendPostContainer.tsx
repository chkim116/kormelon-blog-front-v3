import { blogSearchService } from '@domain/blog/search';
import { BlogDetailRecommendPost } from '@app/blog/components/detail/BlogDetailRecommendPost';

export const BlogDetailRecommendPostContainer = async () => {
  const recommendPosts = await blogSearchService.fetchRecommends();

  return <BlogDetailRecommendPost posts={recommendPosts} />;
};
