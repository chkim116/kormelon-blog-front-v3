import React from 'react';
import { Box, Grid } from '@mui/material';
import { PostCard } from '@common/components';
import { BlogPostModel } from '@features/blog/models';
import { FirstPostCard } from './FirstPostCard';

interface BlogPostListProps {
  firstPost: BlogPostModel | null;
  restPost: BlogPostModel[];
  loading: boolean;
}

export const BlogPostList = ({
  firstPost = null,
  restPost = [],
  loading = false,
}: BlogPostListProps) => (
  <Box mt={{ xs: 2, md: 4 }}>
    {firstPost && <FirstPostCard loading={loading} {...firstPost} />}

    {restPost.length ? (
      <Grid
        container
        my={{ xs: 4, md: 10 }}
        spacing={4}
        rowGap={10}
        columns={{ xs: 4, md: 8, lg: 12 }}
      >
        {restPost.map((post) => (
          <Grid xs={4} item key={post.id}>
            <PostCard loading={loading} {...post} />
          </Grid>
        ))}
      </Grid>
    ) : null}
  </Box>
);
