import { padLeft, padRight, toString } from 'safers';
import { PostDetailEntity, PostDetailNearPostEntity } from '@shared/entities';
import { date } from '@core/lib/date';
import { DEFAULT_IMAGE } from '@shared/constants/img.const';
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
      id: entity.category.id,
      value: entity.category.value,
      subCategoryId: entity.subCategory.id,
      subCategoryValue: entity.subCategory.value,
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
      id: entity.user.id,
      profileImage: entity.user.profileImage,
      username: entity.user.username,
    },
    tags: entity.tags,
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
    createdAt: entity.createdAt,
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
