import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@common/store';

const selPost = (state: RootState) => state.blog;

export const selBlogPostLoading = createSelector(
  selPost,
  (state) => state.loading,
);

export const selBlogPosts = createSelector(selPost, (state) => state.posts);

export const selBlogPostTotalCount = createSelector(
  selPost,
  (state) => state.total,
);

export const selBlogPostSearchParams = createSelector(
  selPost,
  (state) => state.params,
);