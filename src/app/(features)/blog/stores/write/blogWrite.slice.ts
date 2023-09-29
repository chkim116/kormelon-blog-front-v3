import { AnyAction, createSlice } from '@reduxjs/toolkit';

interface PostSliceState {
  updateLoading: boolean;
}

function createBlogWriteSliceState(): PostSliceState {
  return {
    updateLoading: false,
  };
}

export const blogWriteSlice = createSlice({
  name: 'blogWrite',
  initialState: createBlogWriteSliceState(),
  reducers: {},
  extraReducers(builder) {
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
