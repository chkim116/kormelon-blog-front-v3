import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BlogPostCreateParams,
  BlogPostSearchParams,
  BlogPostUpdateParams,
} from '@core/entities';
import { repo } from '@core/repo';
import {
  BlogPostDetailResultPayload,
  BlogPostSearchResultPayload,
} from '../models/blog.model';
import {
  toBlogPostDetailModel,
  toBlogPostModels,
} from '../manipulates/blog.convert';

export const effBlogPostsLoad = createAsyncThunk<
  BlogPostSearchResultPayload,
  BlogPostSearchParams
>('blogPostsLoad', async (params, { rejectWithValue }) => {
  try {
    const {
      data: { payload, meta },
    } = await repo.post.fetchPosts(params);

    return { posts: toBlogPostModels(payload), total: meta.total };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effBlogPostDetailLoad = createAsyncThunk<
  BlogPostDetailResultPayload,
  number
>('blogPostDetailLoad', async (id, { rejectWithValue }) => {
  try {
    const {
      data: { payload },
    } = await repo.post.fetchPostById(id);

    return {
      next: payload.next,
      prev: payload.prev,
      post: toBlogPostDetailModel(payload.post),
    };
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const effBlogPostCreate = createAsyncThunk<void, BlogPostCreateParams>(
  'blogPostCreate',
  async (params, { rejectWithValue }) => {
    try {
      await repo.post.createPost(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effBlogPostUpdate = createAsyncThunk<void, BlogPostUpdateParams>(
  'blogPostUpdate',
  async (params, { rejectWithValue }) => {
    try {
      await repo.post.updatePost(params);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effBlogPostDelete = createAsyncThunk<void, number>(
  'blogPostDelete',
  async (id, { rejectWithValue }) => {
    try {
      await repo.post.deletePost(id);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const effBlogPostLike = createAsyncThunk<void, number>(
  'blogPostLike',
  async (id) => {
    await repo.post.addLikePost(id);
  },
);

export const effBlogPostAddView = createAsyncThunk<void, number>(
  'blogPostView',
  async (id) => {
    await repo.post.addPostView(id);
  },
);

export const effBlogPostImageUpload = createAsyncThunk<string, File>(
  'blogPostImageUpload',
  async (file) => {
    const {
      data: { payload },
    } = await repo.post.uploadImage(file);

    return payload;
  },
);
