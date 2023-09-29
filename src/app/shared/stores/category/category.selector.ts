import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@shared/stores';

const selCategory = (state: RootState) => state.shared.category;

export const selCategoryLoading = createSelector(
  selCategory,
  (state) => state.loading,
);

export const selCategoryCreateLoading = createSelector(
  selCategory,
  (state) => state.createLoading,
);

export const selCategories = createSelector(
  selCategory,
  (state) => state.categories,
);

export const drfCategories = createDraftSafeSelector(
  selCategory,
  (state) => state.categories,
);

export const selSubCategories = createSelector(
  selCategory,
  (state) => state.subCategories,
);

export const selCurrentCategoryName = createSelector(
  selCategory,
  (state) => state.currentCategoryName,
);
