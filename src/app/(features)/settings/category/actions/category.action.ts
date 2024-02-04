'use server';
import 'server-only';
import {
  createActionRejectedWithError,
  createActionResolve,
  createActionResolveWithData,
} from 'src/app/shared/manipulates/sharedActions.create';
import {
  ActionFnType,
  ActionFormFnType,
} from 'src/app/shared/uiStates/sharedActions.uiState';
import { categoryService } from '@domain/category';
import {
  CategoryCreateUiParams,
  SubCategoryCreateUiParams,
  CategoryUpdateUiParams,
  SubCategoryUpdateUiParams,
  CategorySearchUiState,
} from '@domain/category/category.uiState';

export const actCategoryCreate: ActionFormFnType<
  CategoryCreateUiParams,
  string
> = async (_, params) => {
  try {
    await categoryService.createCategory(params);

    return createActionResolveWithData(params.value);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCategorySubCreate: ActionFnType<
  SubCategoryCreateUiParams,
  string
> = async (params) => {
  try {
    await categoryService.createSubCategory(params);

    return createActionResolveWithData(params.value);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCategoryDelete: ActionFnType<number, void> = async (id) => {
  try {
    await categoryService.deleteCategory(id);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCategorySubDelete: ActionFnType<number, void> = async (id) => {
  try {
    await categoryService.deleteSubCategory(id);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCategoryUpdate: ActionFnType<
  CategoryUpdateUiParams,
  void
> = async (params) => {
  try {
    await categoryService.updateCategory(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCategorySubUpdate: ActionFnType<
  SubCategoryUpdateUiParams,
  void
> = async (params) => {
  try {
    await categoryService.updateSubCategory(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCategoriesLoad: ActionFnType<
  void,
  CategorySearchUiState[]
> = async () => {
  try {
    const results = await categoryService.fetchCategories();

    return createActionResolveWithData(results);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
