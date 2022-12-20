import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlogPostSearchParams } from '@core/entities';
import { repo } from '@core/repo';
import { toBlogPostModels, toBlogPrivatePostModels } from '../../manipulates';
import { BlogPostSearchResultPayload } from '../../models/blog.model';

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

export const effBlogPrivatePostsLoad = createAsyncThunk<
  BlogPostSearchResultPayload,
  void
>('blogPrivatePostsLoad', async (_) => {
  const {
    data: { payload, meta },
  } = await repo.post.fetchPrivatePosts();

  return { posts: toBlogPrivatePostModels(payload), total: meta.total };
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
