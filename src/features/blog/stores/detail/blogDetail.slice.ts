import { createSlice } from '@reduxjs/toolkit';
import { BlogPostNearEntity } from '@core/entities';
import { createBlogPostDetailModel } from '@features/blog/manipulates';
import {
  BlogPostCommentSearchModel,
  BlogPostDetailModel,
  BlogPostModel,
} from '@features/blog/models';
import {
  effBlogPostCommentsLoad,
  effBlogPostDetailLoad,
  effBlogPostRecommendLoad,
} from './blogDetail.effect';

interface PostSliceState {
  loading: boolean;
  recommendPosts: BlogPostModel[];
  postDetail: BlogPostDetailModel;
  postNear: BlogPostNearEntity;
  postComments: BlogPostCommentSearchModel[];
  postId: number;
}

function createBlogSliceState(): PostSliceState {
  return {
    loading: false,
    recommendPosts: [],
    postNear: {
      next: null,
      prev: null,
    },
    postDetail: createBlogPostDetailModel(),
    postComments: [],
    postId: 0,
  };
}

export const blogDetailSlice = createSlice({
  name: 'blogDetail',
  initialState: createBlogSliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effBlogPostDetailLoad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(effBlogPostDetailLoad.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.postDetail = payload.post;
      state.postNear = {
        next: payload.next,
        prev: payload.prev,
      };
    });
    builder.addCase(effBlogPostDetailLoad.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(effBlogPostCommentsLoad.fulfilled, (state, { payload }) => {
      state.postComments = payload;
    });

    builder.addCase(
      effBlogPostRecommendLoad.fulfilled,
      (state, { payload }) => {
        state.recommendPosts = payload;
      },
    );
  },
});