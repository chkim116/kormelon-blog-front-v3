import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@common/store';

const selPost = (state: RootState) => state.post;

export const selPostLoading = createSelector(selPost, (state) => state.loading);

export const selPosts = createSelector(selPost, (state) => state.posts);

export const selPostTotalCount = createSelector(
  selPost,
  (state) => state.total,
);

export const selPostSearchParams = createSelector(
  selPost,
  (state) => state.params,
);

export const selPostDetail = createSelector(
  selPost,
  (state) => state.postDetail,
);

export const selPostDetailNear = createSelector(
  selPost,
  (state) => state.postNear,
);

export const selUpdateLoading = createSelector(
  selPost,
  (state) => state.updateLoading,
);
