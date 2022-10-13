import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {
  PostCategoryEntity,
  PostDetailEntity,
  PostEntity,
  PostSearchParams,
} from '@core/entities';
import { DEFAULT_PAGE, DEFAULT_PER } from '@common/constants';
import { env } from '@common/env';
import {
  AnchorModel,
  PostCategoryModel,
  PostDetailModel,
  PostModel,
} from '../models/post.model';

dayjs.extend(localizedFormat);

export function refinePostSearchParams(
  params: Record<string, string>,
): PostSearchParams {
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

export function refineReadingTime(time: number) {
  return time + ' minute read';
}

export function refineCreatedAt(createdAt: string) {
  return dayjs(createdAt).format('LL');
}

export function toPostModels(entities: PostEntity[]): PostModel[] {
  return entities.map((entity) => ({
    ...entity,
    createdAt: refineCreatedAt(entity.createdAt),
    readTime: refineReadingTime(entity.readTime),
  }));
}

export function toPostCategoryModel(
  categoryEntity: PostCategoryEntity,
  subCategoryEntity: PostCategoryEntity,
): PostCategoryModel {
  return {
    id: categoryEntity.id,
    value: categoryEntity.value,
    subCategoryId: subCategoryEntity.id,
    subCategoryValue: subCategoryEntity.value,
  };
}

export function toPostDetailModel(detail: PostDetailEntity): PostDetailModel {
  return {
    ...detail,
    category: toPostCategoryModel(detail.category, detail.subCategory),
    createdAt: refineCreatedAt(detail.createdAt),
    readTime: refineReadingTime(detail.readTime),
  };
}

export function extractHeadingText(): AnchorModel[] {
  if (env.isSSR) {
    return [];
  }

  const anchors: AnchorModel[] = [];

  document
    .querySelectorAll('h1')
    .forEach((element) =>
      anchors.push({ id: element.id, value: element.textContent || '' }),
    );

  return anchors.slice(1, anchors.length);
}
