import { BlogDetailNearPost } from '@features/blog/components/detail/BlogDetailNearPost';
import { BlogDetailNearDto } from '@features/blog/domains/detail/blogDetail.uiState';

interface BlogDetailNearPostContainerProps {
  nearPost: BlogDetailNearDto;
}

export const BlogDetailNearPostContainer = ({
  nearPost,
}: BlogDetailNearPostContainerProps) => (
  <BlogDetailNearPost nearPost={nearPost} />
);
