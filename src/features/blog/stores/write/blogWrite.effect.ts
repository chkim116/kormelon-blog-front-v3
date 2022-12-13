import { createAsyncThunk } from '@reduxjs/toolkit';
import { repo } from '@core/repo';
import { BlogPostCreateParams, BlogPostUpdateParams } from '@core/entities';

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
