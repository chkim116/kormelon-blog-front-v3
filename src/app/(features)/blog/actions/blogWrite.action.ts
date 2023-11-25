'use server';
import 'server-only';

import { blogDetailService } from '@domain/blog/detail';
import { BlogDetailUiState } from '@domain/blog/detail/blogDetail.uiState';
import { blogWriteService } from '@domain/blog/write';
import {
  BlogWriteCreateUiParams,
  BlogWriteUpdateUiParams,
} from '@domain/blog/write/blogWrite.uiState';
import {
  createActionRejectedWithError,
  createActionResolveWithData,
} from 'src/app/shared/manipulates/sharedActions.create';
import {
  ActionFnType,
  ActionFormFnType,
} from 'src/app/shared/uiStates/sharedActions.uiState';
import { actSharedRevalidateTags } from '@shared/actions/sharedUtils.action';
import { FETCH_POST_BY_ID_CACHE_TAG } from '@server/repositories/post.repo';

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

    await actSharedRevalidateTags(FETCH_POST_BY_ID_CACHE_TAG);
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
