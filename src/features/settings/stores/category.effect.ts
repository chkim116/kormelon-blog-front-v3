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

export const effCategoriesLoad = createAsyncThunk<CategoryEntity[], void>(
  'categoriesLoad',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { payload },
      } = await repo.category.fetchCategories();

      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
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
  async (params, { rejectWithValue }) => {
    try {
      await repo.category.createCategory(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effSubCategoriesCreate = createAsyncThunk<
  void,
  SubCategoryCreateParams
>('subCategoryCreate', async (params, { rejectWithValue }) => {
  try {
    await repo.category.createSubCategory(params);
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effCategoriesUpdate = createAsyncThunk<void, CategoryUpdateParams>(
  'categoriesUpdate',
  async (params, { rejectWithValue }) => {
    try {
      await repo.category.updateCategory(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effSubCategoriesUpdate = createAsyncThunk<
  void,
  SubCategoryUpdateParams
>('subCategoriesUpdate', async (params, { rejectWithValue }) => {
  try {
    await repo.category.updateSubCategory(params);
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effCategoriesDelete = createAsyncThunk<void, number>(
  'categoriesDelete',
  async (id, { rejectWithValue }) => {
    try {
      await repo.category.deleteCategory(id);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effSubCategoriesDelete = createAsyncThunk<void, number>(
  'subCategoriesDelete',
  async (id, { rejectWithValue }) => {
    try {
      await repo.category.deleteSubCategory(id);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
