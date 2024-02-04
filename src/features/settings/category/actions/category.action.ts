'use server';
import 'server-only';

import {
  createActionRejectedWithError,
  createActionResolveWithData,
  createSafeAction,
  createSafeFormAction,
} from '@shared/domains/common/sharedActions.create';
import { categoryService } from '@features/categories/domains';
import {
  CategoryCreateUiParams,
  CategoryUpdateUiParams,
  SubCategoryCreateUiParams,
  SubCategoryUpdateUiParams,
} from '@features/categories/domains/category.uiState';
import 'server-only';

export const actCategoryCreate = createSafeFormAction(
  async (params: CategoryCreateUiParams) => {
    try {
      await categoryService.createCategory(params);

      return createActionResolveWithData(params.value);
    } catch (err) {
      return createActionRejectedWithError(err);
    }
  },
);

export const actCategorySubCreate = createSafeFormAction(
  async (params: SubCategoryCreateUiParams) => {
    await categoryService.createSubCategory(params);

    return params.value;
  },
);

export const actCategoryDelete = createSafeFormAction(async (id: number) => {
  await categoryService.deleteCategory(id);
});

export const actCategorySubDelete = createSafeFormAction(async (id: number) => {
  await categoryService.deleteSubCategory(id);
});

export const actCategoryUpdate = createSafeFormAction(
  async (params: CategoryUpdateUiParams) => {
    await categoryService.updateCategory(params);
  },
);

export const actCategorySubUpdate = createSafeFormAction(
  async (params: SubCategoryUpdateUiParams) => {
    await categoryService.updateSubCategory(params);
  },
);

export const actCategoriesLoad = createSafeAction(async () => {
  const results = await categoryService.fetchCategories();

  return results;
}, []);
