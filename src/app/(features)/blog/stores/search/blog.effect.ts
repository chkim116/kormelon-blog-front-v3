import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  toBlogPostModels,
  toBlogPostSearchParams,
  toBlogPrivatePostModels,
} from '@domain/manipulates';
import {
  BlogPostSearchParamsModel,
  BlogPostSearchResultPayload,
} from '@domain/uiStates';
import { repo } from '@server/repo';
import { DEFAULT_PER } from '@shared/constants';

export const effBlogPostsLoad = createAsyncThunk<
  BlogPostSearchResultPayload,
  BlogPostSearchParamsModel
>('blogPostsLoad', async (params, { rejectWithValue }) => {
  try {
    const {
      data: { payload, meta },
    } = await repo.post.fetchPosts(toBlogPostSearchParams(params));

    return {
      posts: toBlogPostModels(payload),
      total: meta.total,
      totalPage: Math.ceil(meta.total / params.per),
    };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effBlogPrivatePostsLoad = createAsyncThunk<
  BlogPostSearchResultPayload,
  void
>('blogPrivatePostsLoad', async (_) => {
  const {
    data: { payload, meta },
  } = await repo.post.fetchPrivatePosts();

  return {
    posts: toBlogPrivatePostModels(payload),
    total: meta.total,
    totalPage: Math.ceil(meta.total / DEFAULT_PER),
  };
});

export const effBlogPostImageUpload = createAsyncThunk<string, File>(
  'blogPostImageUpload',
  async (file) => {
    const {
      data: { payload },
    } = await repo.post.uploadImage(file);

    return payload;
  },
);
