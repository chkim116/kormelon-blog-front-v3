import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@common/store';

const selSearchPost = (state: RootState) => state.search;

export const selSearchPostLoading = createSelector(
  selSearchPost,
  (state) => state.loading,
);

export const selSearchPosts = createSelector(
  selSearchPost,
  (state) => state.posts,
);

export const selSearchTotal = createSelector(
  selSearchPost,
  (state) => state.total,
);