import { useCallback, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { batch, useSelector } from 'react-redux';
import { useAppDispatch } from '@common/store';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import { effCategoriesLoad, selCategories } from '@features/settings/stores';
import {
  PostCategoryContainer,
  PostHeroContainer,
  PostPaginationContainer,
} from '../containers/search';
import { refinePostSearchParams } from '../manipulates/post.convert';
import { effPostsLoad, selPosts } from '../stores';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PostListPageProps {}

export const PostListPage = (_: PostListPageProps) => {
  const dispatch = useAppDispatch();
  const query = useQueryParser(refinePostSearchParams);
  const posts = useSelector(selPosts);
  const categories = useSelector(selCategories);

  const loadPostList = useCallback(() => {
    batch(() => {
      dispatch(effPostsLoad(query));
      dispatch(effCategoriesLoad());
    });
  }, [dispatch, query]);

  useEffect(loadPostList, [loadPostList]);

  return (
    <Box>
      <PostHeroContainer />

      <Container maxWidth="xl">
        <PostCategoryContainer categories={categories} posts={posts} />
        <PostPaginationContainer />
      </Container>
    </Box>
  );
};
