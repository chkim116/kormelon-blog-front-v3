import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@shared/stores';

const selTag = (state: RootState) => state.shared.tag;

export const selTagLoading = createSelector(selTag, (state) => state.loading);

export const selTagSearchTags = createSelector(selTag, (state) => state.tags);

export const selTagLoadTags = createSelector(
  selTag,
  (state) => state.tagsByLoad,
);
