import {
  CategoryEntity,
  CategorySubCategoryEntity,
  SubCategoryEntity,
} from '@server/entities';
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

  return subCategories.map((subCategory) => {
    const result: CategorySubCategoryUiState = {
      id: subCategory.id,
      value: subCategory.value,
    };

    return result;
  });
}

export function toCategorySearchUiStates(entities: CategoryEntity[]) {
  return entities.map((entity) => {
    const result: CategorySearchUiState = {
      id: entity.id,
      value: entity.value,
      posts: entity.posts,
      subCategories: toCategorySubCategoryUiStates(entity.subCategories),
    };

    return result;
  });
}

export function toSubCategorySearchUiStates(entities: SubCategoryEntity[]) {
  return entities.map((entity) => {
    const result: SubCategorySearchUiState = {
      id: entity.id,
      value: entity.value,
      categoryId: entity.category.id,
      categoryName: entity.category.value,
    };

    return result;
  });
}
