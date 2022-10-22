import React from 'react';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';
import dynamic from 'next/dynamic';
import { BlogPostNearEntity } from '@core/entities';
import { env } from '@common/env';
import {
  BlogPostDetailContainer,
  BlogPostNearContainer,
} from '../containers/detail';
import { BlogPostDetailModel } from '../models/blog.model';

const BlogPostDetailSkeleton = dynamic(() =>
  import('../components/detail/PostDetailSkeleton').then(
    ({ PostDetailSkeleton }) => PostDetailSkeleton,
  ),
);

interface BlogPostDetailPageProps {
  post: BlogPostDetailModel;
  postNear: BlogPostNearEntity;
}

export const BlogPostDetailPage = ({
  post,
  postNear,
}: BlogPostDetailPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    if (env.isSSR) {
      return <></>;
    }

    return <BlogPostDetailSkeleton />;
  }

  return (
    <Box component="article">
      <BlogPostDetailContainer post={post} />
      <Divider
        sx={{
          maxWidth: 'md',
          mx: 'auto',
          my: 8,
        }}
      />
      <BlogPostNearContainer postNear={postNear} />
    </Box>
  );
};
