import dayjs from 'dayjs';
import { DEFAULT_PAGE, DEFAULT_PER } from '@common/constants';
import {
  BlogPostCategoryEntity,
  BlogPostEntity,
  BlogPostSearchParams,
  BlogPrivatePostEntity,
} from '@core/entities';
import {
  BlogPostCategoryModel,
  BlogPostModel,
  BlogPrivatePostModel,
} from '../models/blog.model';

export function refineBlogPostSearchParams(
  params: Record<string, string>,
): BlogPostSearchParams {
  const { page, per, keyword, categoryId, subCategoryId } = params;

  const result = {
    page: Number(page || DEFAULT_PAGE),
    per: Number(per || DEFAULT_PER),
    keyword,
    categoryId: categoryId ? Number(categoryId) : undefined,
    subCategoryId: subCategoryId ? Number(subCategoryId) : undefined,
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
