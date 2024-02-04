import { padRight, removeEmptyKeys, toNumber, toString } from 'safers';
import { date } from '@core/lib/date';
import {
  PostPrivateSearchEntity,
  PostSearchEntity,
  PostSearchParams,
} from '@core/entities';
import { DEFAULT_IMAGE } from '@shared/constants/img.const';
import { DEFAULT_PAGE, DEFAULT_PER } from '@shared/constants/page.const';
import {
  BlogSearchPrivateUiState,
  BlogSearchUiParams,
  BlogSearchUiState,
} from './blogSearch.uiState';

export function refineBlogSearchUiParams(raw: Record<string, unknown>) {
  const { page, per, keyword, categoryId, subCategoryId } = raw;

  const result: BlogSearchUiParams = {
    page: toNumber(page, DEFAULT_PAGE),
    per: toNumber(per, DEFAULT_PER),
    keyword: toString(keyword),
    categoryId: toNumber(categoryId),
    subCategoryId: toNumber(subCategoryId),
  };

  return removeEmptyKeys(result, ['page', 'per']);
}

export function toPostSearchParams(uiParams: BlogSearchUiParams) {
  const result: PostSearchParams = removeEmptyKeys(uiParams);

  return result;
}

export function toBlogSearchUiStates(entities: PostSearchEntity[]) {
  return entities.map((entity) => {
    const result: BlogSearchUiState = {
      id: entity.id,
      title: entity.title,
      thumbnail: toString(entity.thumbnail, DEFAULT_IMAGE, false),
      preview: entity.preview,
      createdAt: date(entity.createdAt).format('ll'),
      readTime: padRight(entity.readTime, ' minute read'),
    };

    return result;
  });
}

export function toBlogSearchPrivateUiStates(
  entities: PostPrivateSearchEntity[],
) {
  return entities.map((entity) => {
    const result: BlogSearchPrivateUiState = {
      id: entity.id,
      title: entity.title,
      thumbnail: toString(entity.thumbnail, DEFAULT_IMAGE, false),
      preview: entity.preview,
      createdAt: date(entity.createdAt).format('ll'),
      readTime: padRight(entity.readTime, ' minute read'),
      isPrivate: entity.isPrivate,
    };

    return result;
  });
}
