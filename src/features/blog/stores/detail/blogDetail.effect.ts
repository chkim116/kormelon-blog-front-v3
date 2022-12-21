import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@common/store';
import { repo } from '@core/repo';
import {
  toBlogPostCommentSearchModels,
  toBlogPostDetailModel,
  toBlogPostModels,
  toCommentCreateParams,
  toCommentDeleteParams,
  toCommentReplyCreateParams,
  toCommentReplyDeleteParams,
  toCommentReplyUpdateParams,
  toCommentUpdateParams,
} from '../../manipulates';
import {
  BlogPostCommentCreateParamsModel,
  BlogPostCommentDeleteParamsModel,
  BlogPostCommentReplyCreateParamsModel,
  BlogPostCommentReplyDeleteParamsModel,
  BlogPostCommentReplyUpdateParamsModel,
  BlogPostCommentSearchModel,
  BlogPostCommentUpdateParamsModel,
  BlogPostDetailResultPayload,
  BlogPostModel,
} from '../../models';

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

export const effBlogPrivatePostDetailLoad = createAsyncThunk<
  BlogPostDetailResultPayload,
  number
>('blogPostPrivateDetailLoad', async (id) => {
  const {
    data: { payload },
  } = await repo.post.fetchPrivatePostById(id);

  return {
    next: payload.next,
    prev: payload.prev,
    post: toBlogPostDetailModel(payload.post),
  };
});

export const effBlogPostRecommendLoad = createAsyncThunk<BlogPostModel[], void>(
  'blogPostRecommendLoad',
  async () => {
    const {
      data: { payload },
    } = await repo.post.fetchRecommendPosts();

    return toBlogPostModels(payload);
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

export const effBlogPostDelete = createAsyncThunk<void, number>(
  'blogPostDelete',
  async (id) => {
    await repo.post.deletePost(id);
  },
);

export const effBlogPostCommentsLoad = createAsyncThunk<
  BlogPostCommentSearchModel[],
  number
>('blogPostCommentsLoad', async (postId) => {
  const {
    data: { payload },
  } = await repo.comment.fetchComments(postId);

  return toBlogPostCommentSearchModels(payload);
});

export const effBlogPostCommentCreate = createAsyncThunk<
  void,
  BlogPostCommentCreateParamsModel,
  { state: RootState }
>('blogPostCommentCreate', async (params, { dispatch }) => {
  await repo.comment.createComment(toCommentCreateParams(params));

  dispatch(effBlogPostCommentsLoad(params.postId));
});

export const effBlogPostCommentUpdate = createAsyncThunk<
  void,
  BlogPostCommentUpdateParamsModel,
  { state: RootState }
>('blogPostCommentUpdate', async (params, { dispatch }) => {
  await repo.comment.updateComment(toCommentUpdateParams(params));

  dispatch(effBlogPostCommentsLoad(params.postId));
});

export const effBlogPostCommentDelete = createAsyncThunk<
  void,
  BlogPostCommentDeleteParamsModel,
  { state: RootState }
>('blogPostCommentDelete', async (params, { dispatch }) => {
  await repo.comment.deleteComment(toCommentDeleteParams(params));

  dispatch(effBlogPostCommentsLoad(params.postId));
});

export const effBlogPostCommentReplyCreate = createAsyncThunk<
  void,
  BlogPostCommentReplyCreateParamsModel,
  { state: RootState }
>('blogPostCommentReplyCreate', async (params, { dispatch }) => {
  await repo.comment.createCommentReply(toCommentReplyCreateParams(params));

  dispatch(effBlogPostCommentsLoad(params.postId));
});

export const effBlogPostCommentReplyUpdate = createAsyncThunk<
  void,
  BlogPostCommentReplyUpdateParamsModel,
  { state: RootState }
>('blogPostCommentReplyUpdate', async (params, { dispatch }) => {
  await repo.comment.updateCommentReply(toCommentReplyUpdateParams(params));

  dispatch(effBlogPostCommentsLoad(params.postId));
});

export const effBlogPostCommentReplyDelete = createAsyncThunk<
  void,
  BlogPostCommentReplyDeleteParamsModel,
  { state: RootState }
>('blogPostCommentReplyDelete', async (params, { dispatch }) => {
  await repo.comment.deleteCommentReply(toCommentReplyDeleteParams(params));

  dispatch(effBlogPostCommentsLoad(params.postId));
});
