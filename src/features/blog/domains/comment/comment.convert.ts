import gravatar from 'gravatar';
import { toNumber, toString } from 'safers';
import {
  CommentCreateParams,
  CommentDeleteParams,
  CommentReplyCreateParams,
  CommentReplyDeleteParams,
  CommentReplySearchEntity,
  CommentReplyUpdateParams,
  CommentSearchEntity,
  CommentUpdateParams,
} from '@core/entities';
import { formattingDate } from '@shared/utils/formattingDate';
import {
  CommentCreateUiParams,
  CommentDeleteUiParams,
  CommentReplyCreateUiParams,
  CommentReplyDeleteUiParams,
  CommentReplySearchUiState,
  CommentReplyUpdateUiParams,
  CommentSearchUiParams,
  CommentSearchUiState,
  CommentUpdateUiParams,
} from './comment.uiState';

export function refineCommentSearchUiParams(raw: Record<string, string>) {
  const result: CommentSearchUiParams = {
    postId: toNumber(raw.id),
    notificationId: toNumber(raw.notificationId),
  };

  return result;
}

export function toCommentReplySearchUiStates(
  entities: CommentReplySearchEntity[],
): CommentReplySearchUiState[] {
  return entities.map((entity) => {
    const {
      createdAt,
      deletedAt,
      id,
      isAnonymous,
      username,
      userId,
      value,
      user,
    } = entity;

    const name = toString(user?.username || username, '익명', false);

    const userProfile = toString(
      user?.profileImage,
      gravatar.url(name, {
        s: '100',
        r: 'pg',
        d: 'retro',
        protocol: 'http',
      }),
    );

    return {
      id,
      isAnonymous,
      userProfile,
      userId: toString(userId),
      username: name,
      value,
      createdAt: formattingDate(createdAt, 'YYYY-MM-DD'),
      isDeleted: Boolean(deletedAt),
    };
  });
}

export function toCommentSearchUiStates(
  entities: CommentSearchEntity[],
): CommentSearchUiState[] {
  return entities.map((entity) => {
    const {
      commentReply,
      createdAt,
      deletedAt,
      id,
      isAnonymous,
      username,
      userId,
      value,
      user,
    } = entity;

    const name = toString(user?.username || username, '익명', false);

    const userProfile = toString(
      user?.profileImage,
      gravatar.url(name, {
        s: '100',
        r: 'pg',
        d: 'retro',
        protocol: 'http',
      }),
    );

    return {
      id,
      isAnonymous,
      commentReplies: toCommentReplySearchUiStates(commentReply || []),
      userProfile,
      username: name,
      value,
      userId: toString(userId),
      createdAt: formattingDate(createdAt, 'YYYY-MM-DD'),
      isDeleted: Boolean(deletedAt),
    };
  });
}

export function toCommentCreateParams(
  params: CommentCreateUiParams,
): CommentCreateParams {
  return {
    postId: toNumber(params.postId),
    userId: params.userId,
    value: params.commentValue,
    username: params.username,
    password: params.password,
  };
}

export function toCommentUpdateParams(
  params: CommentUpdateUiParams,
): CommentUpdateParams {
  return {
    id: params.commentId,
    userId: params.userId,
    postId: toNumber(params.postId),
    value: params.commentValue,
    password: params.password,
  };
}

export function toCommentDeleteParams(
  params: CommentDeleteUiParams,
): CommentDeleteParams {
  return {
    id: params.commentId,
    userId: params.userId,
    password: params.password,
  };
}

export function toCommentReplyCreateParams(
  params: CommentReplyCreateUiParams,
): CommentReplyCreateParams {
  const { commentId, ...rest } = params;
  return { commentId, ...toCommentCreateParams(rest) };
}

export function toCommentReplyUpdateParams(
  params: CommentReplyUpdateUiParams,
): CommentReplyUpdateParams {
  return toCommentUpdateParams(params);
}

export function toCommentReplyDeleteParams(
  params: CommentReplyDeleteUiParams,
): CommentReplyDeleteParams {
  return toCommentDeleteParams(params);
}
