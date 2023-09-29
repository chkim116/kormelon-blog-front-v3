import { repo } from '@server/repo';
import { toBlogPostModels } from '@domain/manipulates';
import { BlogDetailRecommendPost } from '@app/blog/components/detail';

export const BlogDetailRecommendPostContainer = async () => {
  const recommendPosts = await repo.post
    .fetchRecommendPosts()
    .then(({ data }) => toBlogPostModels(data.payload));

  return <BlogDetailRecommendPost posts={recommendPosts} />;
};
