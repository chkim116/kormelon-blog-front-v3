import { createSlice } from '@reduxjs/toolkit';
import { ViewModel } from '@domain/uiStates';
import { effViewLoad } from './view.effect';

interface ViewSliceState extends ViewModel {}

function createViewSliceState(): ViewSliceState {
  return {
    today: '0',
    total: '0',
  };
}

export const viewSlice = createSlice({
  name: 'view',
  initialState: createViewSliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effViewLoad.fulfilled, (state, { payload }) => {
      state.today = payload.today;
      state.total = payload.total;
    });
  },
});
