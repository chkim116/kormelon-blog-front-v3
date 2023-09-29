'use client';
import { BlogPostNearEntity } from '@server/entities';
import { BlogDetailNearPost } from '@app/blog/components/detail';

interface BlogDetailNearPostContainerProps {
  nearPost: BlogPostNearEntity;
}

export const BlogDetailNearPostContainer = ({
  nearPost,
}: BlogDetailNearPostContainerProps) => (
  <BlogDetailNearPost nearPost={nearPost} />
);
