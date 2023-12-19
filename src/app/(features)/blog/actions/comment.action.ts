'use server';
import 'server-only';

import { commentService } from '@domain/comment';
import {
  CommentCreateUiParams,
  CommentUpdateUiParams,
  CommentDeleteUiParams,
  CommentReplyCreateUiParams,
  CommentReplyUpdateUiParams,
  CommentReplyDeleteUiParams,
  CommentSearchUiState,
} from '@domain/comment/comment.uiState';
import {
  ActionFnType,
  ActionFormFnType,
} from 'src/app/shared/uiStates/sharedActions.uiState';
import {
  createActionRejectedWithError,
  createActionResolve,
  createActionResolveWithData,
} from 'src/app/shared/manipulates/sharedActions.create';
import { actSharedNotificationRead } from 'src/app/shared/actions/sharedNoti.action';

export const actCommentFetch: ActionFnType<
  Record<string, string>,
  CommentSearchUiState[]
> = async (params) => {
  try {
    const { notificationId, postId } = commentService.refineQueryParams(params);

    if (notificationId) {
      await actSharedNotificationRead(notificationId);
    }

    const comments = await commentService.fetchComments(postId);

    return createActionResolveWithData(comments);
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCommentCreate: ActionFormFnType<
  CommentCreateUiParams,
  void
> = async (_, params: CommentCreateUiParams) => {
  try {
    await commentService.createComment(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCommentUpdate: ActionFormFnType<
  CommentUpdateUiParams,
  void
> = async (_, params: CommentUpdateUiParams) => {
  try {
    await commentService.updateComment(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCommentDelete: ActionFormFnType<
  CommentDeleteUiParams,
  void
> = async (_, params: CommentDeleteUiParams) => {
  try {
    await commentService.deleteComment(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCommentReplyCreate: ActionFormFnType<
  CommentReplyCreateUiParams,
  void
> = async (_, params) => {
  try {
    await commentService.createReply(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCommentReplyUpdate: ActionFormFnType<
  CommentReplyUpdateUiParams,
  void
> = async (_, params) => {
  try {
    await commentService.updateReply(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export const actCommentReplyDelete: ActionFormFnType<
  CommentReplyDeleteUiParams,
  void
> = async (_, params) => {
  try {
    await commentService.deleteReply(params);

    return createActionResolve();
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};
