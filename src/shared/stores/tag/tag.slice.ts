import { createSlice } from '@reduxjs/toolkit';
import { TagEntity } from '@core/entities';
import { effTagSearchLoad } from './tag.effect';

interface tagSliceState {
  loading: boolean;

  tags: TagEntity[];
}

function createtagSliceState(): tagSliceState {
  return {
    loading: false,
    tags: [],
  };
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState: createtagSliceState(),
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
  },
});
