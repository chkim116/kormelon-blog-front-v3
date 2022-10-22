import { useCallback, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { batch, useSelector } from 'react-redux';
import { useAppDispatch } from '@common/store';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import { effCategoriesLoad, selCategories } from '@features/settings/stores';
import {
  BlogPostCategoryContainer,
  BlogPostHeroContainer,
  BlogPostPaginationContainer,
} from '../containers/search';
import { refineBlogPostSearchParams } from '../manipulates/blog.convert';
import { effBlogPostsLoad, selBlogPosts } from '../stores';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogPostListPageProps {}

export const BlogPostListPage = (_: BlogPostListPageProps) => {
  const dispatch = useAppDispatch();
  const query = useQueryParser(refineBlogPostSearchParams);
  const posts = useSelector(selBlogPosts);
  const categories = useSelector(selCategories);

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
        <BlogPostCategoryContainer categories={categories} posts={posts} />
        <BlogPostPaginationContainer />
      </Container>
    </Box>
  );
};
