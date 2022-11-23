import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';
import dynamic from 'next/dynamic';
import { BlogPostNearEntity } from '@core/entities';
import { env } from '@common/env';
import { useAppDispatch } from '@common/store';
import { effNotificationRead } from '@shared/stores/notification';
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
  const dispatch = useAppDispatch();

  const notificationId = useMemo(
    () => router.query['notification'],
    [router.query],
  );

  useEffect(() => {
    if (notificationId) {
      dispatch(effNotificationRead(Number(notificationId)));
    }
  }, [dispatch, notificationId]);

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
