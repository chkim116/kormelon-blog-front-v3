import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  PostCreateParams,
  PostSearchParams,
  PostUpdateParams,
} from '@core/entities';
import { repo } from '@core/repo';
import {
  PostDetailResultPayload,
  PostSearchResultPayload,
} from '../models/post.model';
import { toPostDetailModel, toPostModels } from '../manipulates/post.convert';

export const effPostsLoad = createAsyncThunk<
  PostSearchResultPayload,
  PostSearchParams
>('postsLoad', async (params, { rejectWithValue }) => {
  try {
    const {
      data: { payload, meta },
    } = await repo.post.fetchPosts(params);

    return { posts: toPostModels(payload), total: meta.total };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effPostDetailLoad = createAsyncThunk<
  PostDetailResultPayload,
  number
>('postDetailLoad', async (id, { rejectWithValue }) => {
  try {
    const {
      data: { payload },
    } = await repo.post.fetchPostById(id);

    return {
      next: payload.next,
      prev: payload.prev,
      post: toPostDetailModel(payload.post),
    };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effPostCreate = createAsyncThunk<void, PostCreateParams>(
  'postCreate',
  async (params, { rejectWithValue }) => {
    try {
      await repo.post.createPost(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effPostUpdate = createAsyncThunk<void, PostUpdateParams>(
  'postUpdate',
  async (params, { rejectWithValue }) => {
    try {
      await repo.post.updatePost(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effPostDelete = createAsyncThunk<void, number>(
  'postDelete',
  async (id, { rejectWithValue }) => {
    try {
      await repo.post.deletePost(id);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effPostLike = createAsyncThunk<void, number>(
  'postLike',
  async (id) => {
    await repo.post.addLikePost(id);
  },
);

export const effPostAddView = createAsyncThunk<void, number>(
  'postView',
  async (id) => {
    await repo.post.addPostView(id);
  },
);
