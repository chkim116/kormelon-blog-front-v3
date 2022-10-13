import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { PostNearEntity, PostSearchParams } from '@core/entities';
import { createPostDetailModel } from '../manipulates/post.create';
import { PostDetailModel, PostModel } from '../models/post.model';
import { effPostDetailLoad, effPostsLoad } from './post.effect';

interface PostSliceState {
  loading: boolean;
  updateLoading: boolean;

  posts: PostModel[];
  total: number;
  postDetail: PostDetailModel;
  postNear: PostNearEntity;
  params: PostSearchParams;
}

function createPostSliceState(): PostSliceState {
  return {
    loading: false,
    updateLoading: false,

    posts: [],
    postNear: {
      next: null,
      prev: null,
    },
    postDetail: createPostDetailModel(),
    total: 0,
    params: {},
  };
}

export const postSlice = createSlice({
  name: 'post',
  initialState: createPostSliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effPostsLoad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(effPostsLoad.fulfilled, (state, { payload, meta }) => {
      state.loading = false;
      state.posts = payload.posts;
      state.total = payload.total;
      state.params = meta.arg;
    });
    builder.addCase(effPostsLoad.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(effPostDetailLoad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(effPostDetailLoad.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.postDetail = payload.post;
      state.postNear = {
        next: payload.next,
        prev: payload.prev,
      };
    });
    builder.addCase(effPostDetailLoad.rejected, (state) => {
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
