import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {
  BlogPostCategoryEntity,
  BlogPostDetailEntity,
  BlogPostEntity,
  BlogPostSearchParams,
} from '@core/entities';
import { DEFAULT_PAGE, DEFAULT_PER } from '@common/constants';
import { env } from '@common/env';
import {
  BlogPostAnchorModel,
  BlogPostCategoryModel,
  BlogPostDetailModel,
  BlogPostModel,
} from '../models/blog.model';

dayjs.extend(localizedFormat);

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

export function toBlogPostDetailModel(
  detail: BlogPostDetailEntity,
): BlogPostDetailModel {
  return {
    ...detail,
    category: toBlogPostCategoryModel(detail.category, detail.subCategory),
    createdAt: refinePostCreatedAt(detail.createdAt),
    readTime: refinePostReadingTime(detail.readTime),
  };
}

export function extractHeadingText(): BlogPostAnchorModel[] {
  if (env.isSSR) {
    return [];
  }

  const anchors: BlogPostAnchorModel[] = [];

  document
    .querySelectorAll('h1')
    .forEach((element) =>
      anchors.push({ id: element.id, value: element.textContent || '' }),
    );

  return anchors.slice(1, anchors.length);
}
