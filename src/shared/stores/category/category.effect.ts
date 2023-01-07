import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CategoryCreateParams,
  CategoryEntity,
  CategoryUpdateParams,
  SubCategoryCreateParams,
  SubCategoryEntity,
  SubCategoryUpdateParams,
} from '@core/entities';
import { repo } from '@core/repo';
import { RootState } from '@common/store';
import { drfCategories } from './category.selector';

export const effCategoriesLoad = createAsyncThunk<
  CategoryEntity[],
  void,
  { state: RootState }
>('categoriesLoad', async (_, { getState }) => {
  const categories = drfCategories(getState());

  if (categories.length) {
    return categories;
  }

  const {
    data: { payload },
  } = await repo.category.fetchCategories();

  return payload;
});

export const effCategoriesRefresh = createAsyncThunk<CategoryEntity[], void>(
  'categoriesRefresh',
  async (_) => {
    const {
      data: { payload },
    } = await repo.category.fetchCategories();

    return payload;
  },
);

export const effSubCategoriesLoad = createAsyncThunk<SubCategoryEntity[], void>(
  'subCategoriesLoad',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { payload },
      } = await repo.category.fetchSubCategories();

      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effCategoriesCreate = createAsyncThunk<void, CategoryCreateParams>(
  'categoriesCreate',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await repo.category.createCategory(params);
      await dispatch(effCategoriesRefresh());
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effSubCategoriesCreate = createAsyncThunk<
  void,
  SubCategoryCreateParams
>('subCategoryCreate', async (params, { rejectWithValue, dispatch }) => {
  try {
    await repo.category.createSubCategory(params);
    await dispatch(effCategoriesRefresh());
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effCategoriesUpdate = createAsyncThunk<void, CategoryUpdateParams>(
  'categoriesUpdate',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await repo.category.updateCategory(params);
      await dispatch(effCategoriesRefresh());
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effSubCategoriesUpdate = createAsyncThunk<
  void,
  SubCategoryUpdateParams
>('subCategoriesUpdate', async (params, { rejectWithValue, dispatch }) => {
  try {
    await repo.category.updateSubCategory(params);
    await dispatch(effCategoriesRefresh());
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effCategoriesDelete = createAsyncThunk<void, number>(
  'categoriesDelete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await repo.category.deleteCategory(id);
      await dispatch(effCategoriesRefresh());
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effSubCategoriesDelete = createAsyncThunk<void, number>(
  'subCategoriesDelete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await repo.category.deleteSubCategory(id);
      await dispatch(effCategoriesRefresh());
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
