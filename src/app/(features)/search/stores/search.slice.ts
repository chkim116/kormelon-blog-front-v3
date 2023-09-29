import { createSlice } from '@reduxjs/toolkit';
import { SearchPostModel } from '@domain/uiStates';
import { effSearchPostsByKeywords } from './search.effect';

interface SearchSliceState {
  loading: boolean;
  posts: SearchPostModel[];
  total: number;
  totalPage: number;
}

function createSearchSliceState(): SearchSliceState {
  return {
    loading: false,
    posts: [],
    total: 0,
    totalPage: 0,
  };
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: createSearchSliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effSearchPostsByKeywords.pending, (state) => {
      state.loading = true;
      state.posts = [];
      state.total = 0;
      state.totalPage = 0;
    });
    builder.addCase(
      effSearchPostsByKeywords.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.posts = payload.posts;
        state.total = payload.total;
        state.totalPage = payload.totalPage;
      },
    );
    builder.addCase(effSearchPostsByKeywords.rejected, (state) => {
      state.loading = false;
    });
  },
});
