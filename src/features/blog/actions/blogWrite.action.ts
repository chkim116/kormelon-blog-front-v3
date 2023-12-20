'use server';
import 'server-only';

import {
  ActionFnType,
  ActionFormFnType,
} from '@shared/domains/common/sharedActions.uiState';
import {
  createActionRejectedWithError,
  createActionResolveWithData,
} from '@shared/domains/common/sharedActions.create';
import { blogDetailService } from '@features/blog/domains/detail';
import { BlogDetailUiState } from '@features/blog/domains/detail/blogDetail.uiState';
import { blogWriteService } from '@features/blog/domains/write';
import {
  BlogWriteCreateUiParams,
  BlogWriteUpdateUiParams,
} from '@features/blog/domains/write/blogWrite.uiState';

export const actBlogWriteDetailLoad: ActionFnType<
  Record<string, string>,
  BlogDetailUiState
> = async (raw: Record<string, string>) => {
  try {
    const params = blogWriteService.refineQueryParams(raw);

    if (!params.editId) {
      throw new Error('게시글 번호가 0입니다.');
    }

    const { blog } = await blogDetailService.fetchBlogDetail(params.editId);

    return createActionResolveWithData(blog);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actBlogWritePrivateDetailLoad: ActionFnType<
  Record<string, string>,
  BlogDetailUiState
> = async (raw: Record<string, string>) => {
  try {
    const params = blogWriteService.refineQueryParams(raw);

    const { blog } = await blogDetailService.fetchPrivateBlogDetail(
      params.editId,
    );

    return createActionResolveWithData(blog);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actBlogWriteCreate: ActionFormFnType<
  BlogWriteCreateUiParams,
  BlogWriteCreateUiParams
> = async (_, params) => {
  try {
    await blogWriteService.createBlog(params);

    return createActionResolveWithData(params);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actBlogWriteUpdate: ActionFormFnType<
  BlogWriteUpdateUiParams,
  BlogWriteUpdateUiParams
> = async (_, params) => {
  try {
    await blogWriteService.updateBlog(params);

    return createActionResolveWithData(params);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actBlogWriteImageUpload: ActionFnType<FormData, string> = async (
  fd: FormData,
) => {
  try {
    const imageUrl = await blogWriteService.uploadImage(fd);

    return createActionResolveWithData(imageUrl);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
