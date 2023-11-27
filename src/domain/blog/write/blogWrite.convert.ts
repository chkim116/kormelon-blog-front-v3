import { toBoolean, toNumber } from 'safers';
import { PostCreateParams, PostUpdateParams } from '@server/entities';
import {
  BlogWriteCreateUiParams,
  BlogWriteUiParams,
  BlogWriteUpdateUiParams,
} from './blogWrite.uiState';
import { BlogDetailUiState } from '../detail/blogDetail.uiState';

export function refineBlogWriteUiParams(raw: Record<string, unknown>) {
  const result: BlogWriteUiParams = {
    editId: toNumber(raw.editId),
    isPrivateMode: toBoolean(raw.isPrivate),
  };

  return result;
}

export function toBlogWriteCreateUiParams(params: BlogDetailUiState) {
  const { category, content, isPrivate, preview, thumbnail, tags, title } =
    params;

  const result: BlogWriteCreateUiParams = {
    categoryId: category.id,
    subCategoryId: category.subCategoryId,
    tags,
    content,
    isPrivate,
    preview,
    thumbnail,
    title,
  };

  return result;
}

export function toPostCreateParams(params: BlogWriteCreateUiParams) {
  const {
    categoryId,
    subCategoryId,
    content,
    isPrivate,
    preview,
    thumbnail,
    tags,
    title,
  } = params;

  const result: PostCreateParams = {
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    tags: tags.map((tag) => tag.id),
    content,
    isPrivate,
    preview,
    thumbnail,
    title,
  };

  return result;
}

export function toPostUpdateParams(params: BlogWriteUpdateUiParams) {
  const { id, ...rest } = params;

  const result: PostUpdateParams = { id, ...toPostCreateParams(rest) };

  return result;
}
