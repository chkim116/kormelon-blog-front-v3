import { useCallback, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { batch } from 'react-redux';
import { useAppDispatch } from '@common/store';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import { effCategoriesLoad } from '@shared/stores/category';
import {
  BlogPostCategoryTabContainer,
  BlogPostHeroContainer,
  BlogPostPaginationContainer,
} from '../containers/search';
import { refineBlogPostSearchParams } from '../manipulates/blog.convert';
import { effBlogPostsLoad } from '../stores';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogPostListPageProps {}

export const BlogPostListPage = (_: BlogPostListPageProps) => {
  const dispatch = useAppDispatch();
  const query = useQueryParser(refineBlogPostSearchParams);

  const loadPostList = useCallback(() => {
    batch(() => {
      dispatch(effBlogPostsLoad(query));
      dispatch(effCategoriesLoad());
    });
  }, [dispatch, query]);

  useEffect(loadPostList, [loadPostList]);

  return (
    <Box>
      <BlogPostHeroContainer />

      <Container maxWidth="lg">
        <BlogPostCategoryTabContainer />
        <BlogPostPaginationContainer />
      </Container>
    </Box>
  );
};
