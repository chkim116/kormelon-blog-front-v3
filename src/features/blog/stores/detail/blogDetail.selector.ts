import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@common/store';

const selPostDetail = (state: RootState) => state.blogDetail;

export const selBlogPostDetailLoading = createSelector(
  selPostDetail,
  (state) => state.loading,
);

export const selBlogPostComments = createSelector(
  selPostDetail,
  (state) => state.postComments,
);

export const selBlogPostDetail = createSelector(
  selPostDetail,
  (state) => state.postDetail,
);

export const selBlogPostDetailNear = createSelector(
  selPostDetail,
  (state) => state.postNear,
);

export const selBlogPostRecommend = createSelector(
  selPostDetail,
  (state) => state.recommendPosts,
);
