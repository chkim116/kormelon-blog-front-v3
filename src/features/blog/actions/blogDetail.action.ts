'use server';
import 'server-only';

import {
  CreateSafeAction,
  CreateSafeFormAction,
} from '@shared/domains/common/sharedActions.uiState';
import {
  createSafeAction,
  createSafeFormAction,
} from '@shared/domains/common/sharedActions.create';
import { blogDetailService } from '@features/blog/domains/detail';
import { BlogDetailPayloadData } from '@features/blog/domains/detail/blogDetail.uiState';
import {
  createBlogDetailNearUiState,
  createBlogDetailUiState,
} from '../domains/detail/blogDetail.create';

export const actBlogDetailAddLike: CreateSafeAction<number, void> =
  createSafeAction(async (id: number) => {
    await blogDetailService.addLike(id);
  });

export const actBlogDetailDeleteBlog: CreateSafeFormAction<number, void> =
  createSafeFormAction(async (id: number) => {
    await blogDetailService.deleteBlog(id);
  });

export const actBlogDetailSearch: CreateSafeAction<
  number,
  BlogDetailPayloadData
> = createSafeAction(
  async (id: number) => {
    const payload = await blogDetailService.fetchBlogDetail(id);
    await blogDetailService.addVisit(id);

    return payload;
  },
  {
    blog: createBlogDetailUiState(),
    next: createBlogDetailNearUiState(),
    prev: createBlogDetailNearUiState(),
  },
);
