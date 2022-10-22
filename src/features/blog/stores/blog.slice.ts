import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { BlogPostNearEntity, BlogPostSearchParams } from '@core/entities';
import { createBlogPostDetailModel } from '../manipulates/blog.create';
import { BlogPostDetailModel, BlogPostModel } from '../models/blog.model';
import { effBlogPostDetailLoad, effBlogPostsLoad } from './blog.effect';

interface PostSliceState {
  loading: boolean;
  updateLoading: boolean;

  posts: BlogPostModel[];
  total: number;
  postDetail: BlogPostDetailModel;
  postNear: BlogPostNearEntity;
  params: BlogPostSearchParams;
}

function createBlogSliceState(): PostSliceState {
  return {
    loading: false,
    updateLoading: false,

    posts: [],
    postNear: {
      next: null,
      prev: null,
    },
    postDetail: createBlogPostDetailModel(),
    total: 0,
    params: {},
  };
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState: createBlogSliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effBlogPostsLoad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(effBlogPostsLoad.fulfilled, (state, { payload, meta }) => {
      state.loading = false;
      state.posts = payload.posts;
      state.total = payload.total;
      state.params = meta.arg;
    });
    builder.addCase(effBlogPostsLoad.rejected, (state) => {
      state.loading = false;
    });

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

    builder.addMatcher(
      (action: AnyAction) =>
        (action.type.includes('create') || action.type.includes('update')) &&
        action.type.endsWith('/pending'),
      (state) => {
        state.updateLoading = true;
      },
    );
    builder.addMatcher(
      (action: AnyAction) =>
        (action.type.includes('create') || action.type.includes('update')) &&
        (action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected')),
      (state) => {
        state.updateLoading = false;
      },
    );
  },
});
