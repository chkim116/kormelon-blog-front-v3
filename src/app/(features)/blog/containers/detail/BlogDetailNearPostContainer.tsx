import { BlogDetailNearDto } from '@domain/blog/detail/blogDetail.uiState';
import { BlogDetailNearPost } from '@app/blog/components/detail/BlogDetailNearPost';

interface BlogDetailNearPostContainerProps {
  nearPost: BlogDetailNearDto;
}

export const BlogDetailNearPostContainer = ({
  nearPost,
}: BlogDetailNearPostContainerProps) => (
  <BlogDetailNearPost nearPost={nearPost} />
);
