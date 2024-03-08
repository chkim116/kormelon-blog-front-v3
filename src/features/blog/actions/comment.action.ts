'use server';
import 'server-only';

import {
  createSafeAction,
  createSafeFormAction,
} from '@common/lib/createSafeAction';
import { actSharedNotificationRead } from '@shared/actions/sharedNoti.action';
import { commentService } from '@features/blog/domains/comment';
import {
  CommentCreateUiParams,
  CommentDeleteUiParams,
  CommentReplyCreateUiParams,
  CommentReplyDeleteUiParams,
  CommentReplyUpdateUiParams,
  CommentUpdateUiParams,
} from '@features/blog/domains/comment/comment.uiState';

export const actCommentFetch = createSafeAction(
  async (params: Record<string, string>) => {
    const { notificationId, postId } = commentService.refineQueryParams(params);

    if (notificationId) {
      await actSharedNotificationRead(notificationId);
    }

    const comments = await commentService.fetchComments(postId);

    return comments;
  },
  [],
);

export const actCommentCreate = createSafeFormAction(
  async (params: CommentCreateUiParams) => {
    await commentService.createComment(params);
  },
);

export const actCommentUpdate = createSafeFormAction(
  async (params: CommentUpdateUiParams) => {
    await commentService.updateComment(params);
  },
);

export const actCommentDelete = createSafeFormAction(
  async (params: CommentDeleteUiParams) => {
    await commentService.deleteComment(params);
  },
);

export const actCommentReplyCreate = createSafeFormAction(
  async (params: CommentReplyCreateUiParams) => {
    await commentService.createReply(params);
  },
);

export const actCommentReplyUpdate = createSafeFormAction(
  async (params: CommentReplyUpdateUiParams) => {
    await commentService.updateReply(params);
  },
);

export const actCommentReplyDelete = createSafeFormAction(
  async (params: CommentReplyDeleteUiParams) => {
    await commentService.deleteReply(params);
  },
);
