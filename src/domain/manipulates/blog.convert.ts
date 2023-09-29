import dayjs from 'dayjs';
import { DEFAULT_PAGE, DEFAULT_PER } from '@shared/constants';
import {
  BlogPostCategoryEntity,
  BlogPostEntity,
  BlogPostSearchParams,
  BlogPrivatePostEntity,
} from '@server/entities';
import {
  BlogPostCategoryModel,
  BlogPostModel,
  BlogPrivatePostModel,
  BlogPostSearchParamsModel,
} from '../uiStates';

// TODO: Number에 대한 정제 함수
export function refineBlogPostSearchParamsModel(
  params: Record<string, string>,
): BlogPostSearchParamsModel {
  const { page, keyword, categoryId, subCategoryId } = params;

  const result = {
    page: Number(page || DEFAULT_PAGE),
    per: DEFAULT_PER,
    keyword,
    categoryId: Number(categoryId || 0),
    subCategoryId: Number(subCategoryId || 0),
  };

  return result;
}

export function toBlogPostSearchParams(uiState: BlogPostSearchParamsModel) {
  const { categoryId, keyword, page, per, subCategoryId } = uiState;

  const result: BlogPostSearchParams = {
    page: page,
    per,
    keyword,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
  };

  return result;
}

export function refinePostReadingTime(time: number) {
  return time + ' minute read';
}

export function refinePostCreatedAt(createdAt: string) {
  return dayjs(createdAt).format('LL');
}

export function toBlogPostModels(entities: BlogPostEntity[]): BlogPostModel[] {
  return entities.map((entity) => ({
    ...entity,
    createdAt: refinePostCreatedAt(entity.createdAt),
    readTime: refinePostReadingTime(entity.readTime),
  }));
}

export function toBlogPrivatePostModels(
  entities: BlogPrivatePostEntity[],
): BlogPrivatePostModel[] {
  return entities.map((entity) => ({
    ...entity,
    createdAt: refinePostCreatedAt(entity.createdAt),
    readTime: refinePostReadingTime(entity.readTime),
  }));
}

export function toBlogPostCategoryModel(
  categoryEntity: BlogPostCategoryEntity,
  subCategoryEntity: BlogPostCategoryEntity,
): BlogPostCategoryModel {
  return {
    id: categoryEntity.id,
    value: categoryEntity.value,
    subCategoryId: subCategoryEntity.id,
    subCategoryValue: subCategoryEntity.value,
  };
}
