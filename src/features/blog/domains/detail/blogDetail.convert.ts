import { padLeft, padRight, toNumber, toString } from 'safers';
import { PostDetailEntity, PostDetailNearPostEntity } from '@core/entities';
import { date } from '@core/lib/date';
import { DEFAULT_IMAGE } from '@shared/constants/img.const';
import { formattingDate } from '@shared/utils/formattingDate';
import {
  BlogDetailAnchorUiDto,
  BlogDetailAnchorUiState,
  BlogDetailNearUiState,
  BlogDetailUiState,
} from './blogDetail.uiState';
import { createBlogDetailNearUiState } from './blogDetail.create';

export function toBlogDetailUiState(entity: PostDetailEntity) {
  const result: BlogDetailUiState = {
    category: {
      id: toNumber(entity.category?.id),
      value: toString(entity.category?.value),
      subCategoryId: toNumber(entity.subCategory?.id),
      subCategoryValue: toString(entity.subCategory?.value),
    },
    createdAt: date(entity.createdAt).format('ll'),
    readTime: padRight(entity.readTime, ' minute read'),
    id: entity.id,
    title: entity.title,
    thumbnail: toString(entity.thumbnail, DEFAULT_IMAGE, false),
    preview: entity.preview,
    view: entity.view,
    like: entity.like,
    content: entity.content,
    user: {
      id: toString(entity.user?.id),
      profileImage: toString(entity.user?.profileImage),
      username: toString(entity.user?.username),
    },
    tags: entity.tags || [],
    isPrivate: entity.isPrivate,
  };

  return result;
}

export function toBlogDetailNearUiState(
  entity: PostDetailNearPostEntity | null,
) {
  if (!entity) {
    return createBlogDetailNearUiState();
  }
  const result: BlogDetailNearUiState = {
    id: entity.id,
    title: entity.title,
    thumbnail: toString(entity.thumbnail, DEFAULT_IMAGE, false),
    createdAt: formattingDate(entity.createdAt),
  };

  return result;
}

export function toBlogDetailAnchorUiStates(dtos: BlogDetailAnchorUiDto[]) {
  const results: BlogDetailAnchorUiState[] = [];

  dtos.forEach(({ textContent, offsetTop }) => {
    const text = toString(textContent);
    results.push({
      id: padLeft(text, '#'),
      value: text,
      position: offsetTop,
    });
  });

  return results;
}
