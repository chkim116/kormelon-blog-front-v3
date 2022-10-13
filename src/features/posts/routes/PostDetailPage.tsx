import React from 'react';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';
import dynamic from 'next/dynamic';
import { PostNearEntity } from '@core/entities';
import { env } from '@common/env';
import { PostDetailContainer, PostNearContainer } from '../containers/detail';
import { PostDetailModel } from '../models/post.model';

const PostDetailSkeleton = dynamic(() =>
  import('../components/detail/PostDetailSkeleton').then(
    ({ PostDetailSkeleton }) => PostDetailSkeleton,
  ),
);

interface PostDetailPageProps {
  post: PostDetailModel;
  postNear: PostNearEntity;
}

export const PostDetailPage = ({ post, postNear }: PostDetailPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    if (env.isSSR) {
      return <></>;
    }

    return <PostDetailSkeleton />;
  }

  return (
    <Box component="article">
      <PostDetailContainer post={post} />
      <Divider
        sx={{
          maxWidth: 'md',
          mx: 'auto',
          my: 8,
        }}
      />
      <PostNearContainer postNear={postNear} />
    </Box>
  );
};
