import { createSlice } from '@reduxjs/toolkit';
import { SearchPostModel } from '../model';
import { effSearchPostsByTagId } from './search.effect';

interface SearchSliceState {
  loading: boolean;
  posts: SearchPostModel[];
  total: number;
}

function createSearchSliceState(): SearchSliceState {
  return {
    loading: false,
    posts: [],
    total: 0,
  };
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: createSearchSliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effSearchPostsByTagId.pending, (state) => {
      state.loading = true;
      state.posts = [];
      state.total = 0;
    });
    builder.addCase(effSearchPostsByTagId.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload.posts;
      state.total = payload.total;
    });
    builder.addCase(effSearchPostsByTagId.rejected, (state) => {
      state.loading = false;
    });
  },
});
