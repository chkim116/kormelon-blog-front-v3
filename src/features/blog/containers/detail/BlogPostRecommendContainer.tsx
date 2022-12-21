import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@common/store';
import { intersectionObserver } from '@shared/utils';
import {
  effBlogPostRecommendLoad,
  selBlogPostRecommend,
} from '@features/blog/stores';
import { BlogPostRecommendPost } from '@features/blog/components/detail';

export const BlogPostRecommendContainer = () => {
  const dispatch = useAppDispatch();
  const recommendPosts = useAppSelector(selBlogPostRecommend);

  const refRecommendPostBox = useRef(null);

  useEffect(() => {
    intersectionObserver(refRecommendPostBox.current, { threshold: 0 }, () => {
      dispatch(effBlogPostRecommendLoad());
    });
  }, [dispatch]);

  return (
    <Box maxWidth="md" m="0 auto" p={4} ref={refRecommendPostBox}>
      <BlogPostRecommendPost posts={recommendPosts} />
    </Box>
  );
};
