import { createSlice } from '@reduxjs/toolkit';
import { BlogPostSearchParams } from '@core/entities';
import { BlogPostModel } from '@features/blog/models';
import { effBlogPostsLoad } from './blog.effect';

interface PostSliceState {
  loading: boolean;
  updateLoading: boolean;

  posts: BlogPostModel[];
  total: number;
  params: BlogPostSearchParams;
}

function createBlogSliceState(): PostSliceState {
  return {
    loading: false,
    updateLoading: false,
    posts: [],
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
  },
});
