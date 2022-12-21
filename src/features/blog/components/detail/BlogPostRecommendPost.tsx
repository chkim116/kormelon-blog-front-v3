import React from 'react';
import { Grid, Typography } from '@mui/material';
import { PostCard } from '@common/components';
import { BlogPostModel } from '@features/blog/models';

interface BlogPostRecommendPostProps {
  posts: BlogPostModel[];
}

export const BlogPostRecommendPost = ({
  posts,
}: BlogPostRecommendPostProps) => (
  <>
    <Typography mb={1} component="div" variant="button" color="secondary">
      More
    </Typography>
    <Grid container spacing={4} rowGap={2} columns={{ xs: 2, md: 4 }}>
      {posts.map((post) => (
        <Grid xs={2} item key={post.id}>
          <PostCard {...post} />
        </Grid>
      ))}
    </Grid>
  </>
);
