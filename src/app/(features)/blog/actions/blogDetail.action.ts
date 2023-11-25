'use server';
import 'server-only';

import { blogDetailService } from '@domain/blog/detail';
import {
  createActionRejectedWithError,
  createActionResolve,
  createActionResolveWithData,
} from 'src/app/shared/manipulates/sharedActions.create';
import {
  ActionFnType,
  ActionFormFnType,
} from 'src/app/shared/uiStates/sharedActions.uiState';
import { BlogDetailPayloadData } from '@domain/blog/detail/blogDetail.uiState';
import { actSharedRevalidateTags } from '@shared/actions/sharedUtils.action';
import { FETCH_RECOMMEND_POSTS_CACHE_TAG } from '@server/repositories/post.repo';

export const actBlogDetailAddLike: ActionFnType<number, void> = async (
  id: number,
) => {
  try {
    await blogDetailService.addLike(id);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actBlogDetailDeleteBlog: ActionFormFnType<number, void> = async (
  _,
  id: number,
) => {
  try {
    await blogDetailService.deleteBlog(id);

    await actSharedRevalidateTags(FETCH_RECOMMEND_POSTS_CACHE_TAG);
    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actBlogDetailSearch: ActionFnType<
  number,
  BlogDetailPayloadData
> = async (id: number) => {
  try {
    const payload = await blogDetailService.fetchBlogDetail(id);
    await blogDetailService.addVisit(id);

    return createActionResolveWithData(payload);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
