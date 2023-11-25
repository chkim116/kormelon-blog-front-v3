import {
  CategoryCreateParams,
  CategoryUpdateParams,
  SubCategoryCreateParams,
  SubCategoryUpdateParams,
} from '@server/entities';

export interface CategorySubCategoryUiState {
  id: number;
  value: string;
}

export interface CategorySearchUiState {
  id: number;
  value: string;
  posts: number;
  subCategories: CategorySubCategoryUiState[];
}

export interface CategoryUpdateUiParams extends CategoryUpdateParams {}

export interface CategoryCreateUiParams extends CategoryCreateParams {}

export interface SubCategorySearchUiState {
  id: number;
  value: string;
  categoryId: number;
  categoryName: string;
}

export interface SubCategoryUpdateUiParams extends SubCategoryUpdateParams {}

export interface SubCategoryCreateUiParams extends SubCategoryCreateParams {}
