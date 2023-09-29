import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { CategoryEntity, SubCategoryEntity } from '@server/entities';
import {
  actResetCategoryName,
  effCategoriesLoad,
  effCategoriesRefresh,
  effSubCategoriesLoad,
} from './category.effect';

interface CategorySliceState {
  loading: boolean;
  createLoading: boolean;
  currentCategoryName: string;
  categories: CategoryEntity[];
  subCategories: SubCategoryEntity[];
}

function createCategorySliceState(): CategorySliceState {
  return {
    loading: false,
    createLoading: false,

    currentCategoryName: '',
    categories: [],
    subCategories: [],
  };
}

export const categorySlice = createSlice({
  name: 'category',
  initialState: createCategorySliceState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(effCategoriesLoad.pending, (state) => {
        state.loading = true;
      })
      .addCase(effCategoriesLoad.rejected, (state) => {
        state.loading = false;
      })
      .addCase(effCategoriesLoad.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      });

    builder.addCase(effCategoriesRefresh.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    });

    builder
      .addCase(effSubCategoriesLoad.pending, (state) => {
        state.loading = true;
      })
      .addCase(effSubCategoriesLoad.rejected, (state) => {
        state.loading = false;
      })
      .addCase(effSubCategoriesLoad.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.subCategories = payload;
        state.currentCategoryName = payload[0].category.value;
      });

    builder.addCase(actResetCategoryName, (state, { payload }) => {
      state.currentCategoryName = payload;
    });

    builder.addMatcher(
      (action: AnyAction) =>
        action.type.includes('create') && action.type.endsWith('/pending'),
      (state) => {
        state.createLoading = true;
      },
    );
    builder.addMatcher(
      (action: AnyAction) =>
        action.type.includes('create') &&
        (action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected')),
      (state) => {
        state.createLoading = false;
      },
    );
  },
});
