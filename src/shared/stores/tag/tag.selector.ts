import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@common/store';

const selTag = (state: RootState) => state.shared.tag;

export const selTagLoading = createSelector(selTag, (state) => state.loading);

export const selTagSearchTags = createSelector(selTag, (state) => state.tags);
