import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { CategoryEntity, SubCategoryEntity } from '@core/entities';
import { effCategoriesLoad, effSubCategoriesLoad } from './category.effect';

interface CategorySliceState {
  loading: boolean;
  categories: CategoryEntity[];
  subCategories: SubCategoryEntity[];
}

function createCategorySliceState(): CategorySliceState {
  return {
    loading: false,
    categories: [],
    subCategories: [],
  };
}

export const categorySlice = createSlice({
  name: 'category',
  initialState: createCategorySliceState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(effCategoriesLoad.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = payload;
    });

    builder.addCase(effSubCategoriesLoad.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.subCategories = payload;
    });

    builder.addMatcher(
      (action: AnyAction) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = true;
      },
    );
    builder.addMatcher(
      (action: AnyAction) =>
        action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      (state) => {
        state.loading = false;
      },
    );
  },
});
