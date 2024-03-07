'use server';
import 'server-only';

import {
  createSafeAction,
  createSafeFormAction,
} from '@common/lib/createSafeAction';
import {
  CreateSafeAction,
  CreateSafeFormAction,
} from '@common/lib/createSafeAction.uiState';
import { blogDetailService } from '@features/blog/domains/detail';
import { BlogDetailUiState } from '@features/blog/domains/detail/blogDetail.uiState';
import { blogWriteService } from '@features/blog/domains/write';
import {
  BlogWriteCreateUiParams,
  BlogWriteUpdateUiParams,
} from '@features/blog/domains/write/blogWrite.uiState';

export const actBlogWriteDetailLoad: CreateSafeAction<
  Record<string, string>,
  BlogDetailUiState
> = createSafeAction(async (raw: Record<string, string>) => {
  const params = blogWriteService.refineQueryParams(raw);

  if (!params.editId) {
    throw new Error('게시글 번호가 0입니다.');
  }

  const { blog } = await blogDetailService.fetchBlogDetail(params.editId);

  return blog;
});

export const actBlogWritePrivateDetailLoad: CreateSafeAction<
  Record<string, string>,
  BlogDetailUiState
> = createSafeAction(async (raw: Record<string, string>) => {
  const params = blogWriteService.refineQueryParams(raw);

  const { blog } = await blogDetailService.fetchPrivateBlogDetail(
    params.editId,
  );

  return blog;
});

export const actBlogWriteCreate: CreateSafeFormAction<
  BlogWriteCreateUiParams,
  BlogWriteCreateUiParams
> = createSafeFormAction(async (params) => {
  await blogWriteService.createBlog(params);

  return params;
});

export const actBlogWriteUpdate: CreateSafeFormAction<
  BlogWriteUpdateUiParams,
  BlogWriteUpdateUiParams
> = createSafeFormAction(async (params) => {
  await blogWriteService.updateBlog(params);

  return params;
});

export const actBlogWriteImageUpload: CreateSafeAction<FormData, string> =
  createSafeAction(async (fd: FormData) => {
    const imageUrl = await blogWriteService.uploadImage(fd);

    return imageUrl;
  });
