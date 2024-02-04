import {
  CategoryEntity,
  CategorySubCategoryEntity,
  SubCategoryEntity,
} from '@core/entities';
import {
  CategorySearchUiState,
  CategorySubCategoryUiState,
  SubCategorySearchUiState,
} from './category.uiState';

function toCategorySubCategoryUiStates(
  subCategories: CategorySubCategoryEntity[],
) {
  if (!subCategories.length) {
    return [];
  }

  return subCategories
    .map((subCategory) => {
      const result: CategorySubCategoryUiState = {
        id: subCategory.id,
        value: subCategory.value,
        ordering: subCategory.ordering,
      };

      return result;
    })
    .sort((a, b) => a.ordering - b.ordering);
}

export function toCategorySearchUiStates(entities: CategoryEntity[]) {
  return entities
    .map((entity) => {
      const result: CategorySearchUiState = {
        id: entity.id,
        value: entity.value,
        posts: entity.post.length,
        subCategories: toCategorySubCategoryUiStates(entity.subCategory),
        ordering: entity.ordering,
      };

      return result;
    })
    .sort((a, b) => a.ordering - b.ordering);
}

export function toSubCategorySearchUiStates(entities: SubCategoryEntity[]) {
  return entities
    .map((entity) => {
      const result: SubCategorySearchUiState = {
        id: entity.id,
        value: entity.value,
        categoryId: entity.category.id,
        categoryName: entity.category.value,
        ordering: entity.ordering,
      };

      return result;
    })
    .sort((a, b) => a.ordering - b.ordering);
}
