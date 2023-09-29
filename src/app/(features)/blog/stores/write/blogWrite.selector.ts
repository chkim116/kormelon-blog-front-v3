import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@shared/stores';

const selPostWrite = (state: RootState) => state.blogWrite;

export const selBlogPostUpdateLoading = createSelector(
  selPostWrite,
  (state) => state.updateLoading,
);
