import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@common/store';
import {
  effBlogPostRecommendLoad,
  selBlogPostRecommend,
} from '@features/blog/stores';
import { BlogPostRecommendPost } from '@features/blog/components/detail';

export const BlogPostRecommendContainer = () => {
  const dispatch = useAppDispatch();
  const recommendPosts = useAppSelector(selBlogPostRecommend);

  useEffect(() => {
    dispatch(effBlogPostRecommendLoad());
  }, [dispatch]);

  return (
    <Box maxWidth="md" m="0 auto" p={4}>
      <BlogPostRecommendPost posts={recommendPosts} />
    </Box>
  );
};
