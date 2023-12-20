'use server';
import 'server-only';

import {
  ActionFnType,
  ActionFormFnType,
} from '@shared/domains/common/sharedActions.uiState';
import {
  createActionRejectedWithError,
  createActionResolve,
  createActionResolveWithData,
} from '@shared/domains/common/sharedActions.create';
import { blogDetailService } from '@features/blog/domains/detail';
import { BlogDetailPayloadData } from '@features/blog/domains/detail/blogDetail.uiState';

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
