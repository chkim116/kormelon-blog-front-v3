import { createAsyncThunk } from '@reduxjs/toolkit';
import { repo } from '@core/repo';
import { SearchPostResultPayload } from '../model';
import { toSearchPostModels } from '../manipulates';

export const effSearchPostsByTagId = createAsyncThunk<
  SearchPostResultPayload,
  number
>('searchPostsByTagId', async (tagId) => {
  const {
    data: { payload, meta },
  } = await repo.post.fetchPostsByTagId({ tagId });

  return { posts: toSearchPostModels(payload), total: meta.total };
});
