import { createSlice } from '@reduxjs/toolkit';
import { BlogPostSearchParams } from '@server/entities';
import { BlogPostModel } from '@domain/uiStates';
import { effBlogPostsLoad, effBlogPrivatePostsLoad } from './blog.effect';

interface PostSliceState {
  loading: boolean;
  updateLoading: boolean;

  params: BlogPostSearchParams;
  posts: BlogPostModel[];
  total: number;
  totalPage: number;

  privatePosts: BlogPostModel[];
  privateTotal: number;
}

function createBlogSliceState(): PostSliceState {
  return {
    loading: false,
    updateLoading: false,

    params: {},
    posts: [],
    total: 0,
    totalPage: 0,

    privateTotal: 0,
    privatePosts: [],
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
      state.totalPage = payload.totalPage;
      state.params = meta.arg;
    });
    builder.addCase(effBlogPostsLoad.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(effBlogPrivatePostsLoad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(effBlogPrivatePostsLoad.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.privatePosts = payload.posts;
      state.privateTotal = payload.total;
    });
    builder.addCase(effBlogPrivatePostsLoad.rejected, (state) => {
      state.loading = false;
    });
  },
});
