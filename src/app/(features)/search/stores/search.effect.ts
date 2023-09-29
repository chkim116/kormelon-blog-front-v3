import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BlogPostSearchParamsModel,
  SearchPostResultPayload,
} from '@domain/uiStates';
import {
  toBlogPostSearchParams,
  toSearchPostModels,
} from '@domain/manipulates';
import { repo } from '@server/repo';

export const effSearchPostsByKeywords = createAsyncThunk<
  SearchPostResultPayload,
  BlogPostSearchParamsModel
>('SearchPostsByKeywords', async (params) => {
  const {
    data: { payload, meta },
  } = await repo.post.fetchPosts(toBlogPostSearchParams(params));

  return {
    posts: toSearchPostModels(payload),
    total: meta.total,
    totalPage: Math.ceil(meta.total / params.per),
  };
});
