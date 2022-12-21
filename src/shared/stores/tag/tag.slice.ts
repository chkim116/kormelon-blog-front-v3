import { createSlice } from '@reduxjs/toolkit';
import { TagModel, TagWithPostModel } from '@shared/models';
import { effTagAllSearchLoad, effTagSearchLoad } from './tag.effect';

interface tagSliceState {
  loading: boolean;

  tags: TagModel[];
  tagsByLoad: TagWithPostModel[];
  total: number;
}

function createTagSliceState(): tagSliceState {
  return {
    loading: false,
    tags: [],
    tagsByLoad: [],
    total: 0,
  };
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState: createTagSliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effTagSearchLoad.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(effTagSearchLoad.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tags = payload;
    });
    builder.addCase(effTagSearchLoad.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(effTagAllSearchLoad.pending, (state) => {
      state.loading = true;
      state.tagsByLoad = [];
      state.total = 0;
    });
    builder.addCase(effTagAllSearchLoad.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tagsByLoad = payload.tags;
      state.total = payload.total;
    });
    builder.addCase(effTagAllSearchLoad.rejected, (state) => {
      state.loading = false;
    });
  },
});
