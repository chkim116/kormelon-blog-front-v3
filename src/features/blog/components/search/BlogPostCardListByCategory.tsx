import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { DEFAULT_PAGE } from '@common/constants';
import { BlogPostModel } from '@features/blog/models/blog.model';
import { SubCategoryModel } from '@features/blog/containers/search';
import { CategoryStack } from './CategoryStack';
import { FirstPostCard } from './FirstPostCard';
import { PostCard } from './PostCard';

interface BlogPostCardListByCategoryProps {
  page: number;
  openId: number;
  loading: boolean;
  subCategories: SubCategoryModel[];
  posts: BlogPostModel[];
  onMove: (id: number) => void;
}

export const BlogPostCardListByCategory = ({
  page,
  loading,
  onMove,
  openId,
  posts,
  subCategories,
}: BlogPostCardListByCategoryProps) => {
  const { firstPost, restPost } = useMemo(() => {
    const [firstPost, ...restPost] = posts;

    return {
      firstPost: page === DEFAULT_PAGE ? firstPost : null,
      restPost: page === DEFAULT_PAGE ? restPost : posts,
    };
  }, [page, posts]);

  return (
    <>
      <CategoryStack
        openId={openId}
        categories={subCategories}
        onClick={onMove}
      />

      {posts.length ? (
        <Box mt={{ xs: 2, md: 4 }}>
          {firstPost && <FirstPostCard loading={loading} {...firstPost} />}

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
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          현재 게시된 글이 없습니다. :)
        </Box>
      )}
    </>
  );
};
