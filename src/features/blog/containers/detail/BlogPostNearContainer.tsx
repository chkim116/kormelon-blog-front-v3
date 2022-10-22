import { BlogPostNearEntity } from '@core/entities';
import { BlogPostNear } from '@features/blog/components/detail';

interface BlogPostNearContainerProps {
  postNear: BlogPostNearEntity;
}

export const BlogPostNearContainer = ({
  postNear,
}: BlogPostNearContainerProps) => <BlogPostNear postNear={postNear} />;
