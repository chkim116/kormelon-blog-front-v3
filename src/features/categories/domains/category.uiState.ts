import {
  CategoryCreateParams,
  CategoryUpdateParams,
  SubCategoryCreateParams,
  SubCategoryUpdateParams,
} from '@core/entities';

export interface CategorySubCategoryUiState {
  id: number;
  value: string;
  ordering: number;
}

export interface CategorySearchUiState {
  id: number;
  value: string;
  ordering: number;
  posts: number;
  subCategories: CategorySubCategoryUiState[];
}

export interface CategoryUpdateUiParams extends CategoryUpdateParams {}

export interface CategoryCreateUiParams extends CategoryCreateParams {}

export interface SubCategorySearchUiState {
  id: number;
  value: string;
  ordering: number;
  categoryId: number;
  categoryName: string;
}

export interface SubCategoryUpdateUiParams extends SubCategoryUpdateParams {}

export interface SubCategoryCreateUiParams extends SubCategoryCreateParams {}
