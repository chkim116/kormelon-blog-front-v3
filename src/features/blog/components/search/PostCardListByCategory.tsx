import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { SubCategoryEntity } from '@core/entities';
import { DEFAULT_PAGE } from '@common/constants';
import { BlogPostModel } from '@features/blog/models/blog.model';
import { CategoryStack } from './CategoryStack';
import { FirstPostCard } from './FirstPostCard';
import { PostCard } from './PostCard';

interface PostCardListByCategoryProps {
  page: number;
  loading: boolean;
  openId: number;
  subCategories: Omit<SubCategoryEntity, 'posts'>[];
  onMove: (id: number) => void;
  posts: BlogPostModel[];
}

export const PostCardListByCategory = ({
  page,
  loading,
  onMove,
  openId,
  posts,
  subCategories,
}: PostCardListByCategoryProps) => {
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
