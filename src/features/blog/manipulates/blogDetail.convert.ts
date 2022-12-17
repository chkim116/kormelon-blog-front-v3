import { env } from 'process';
import {
  BlogPostDetailEntity,
  CommentCreateParams,
  CommentDeleteParams,
  CommentReplyCreateParams,
  CommentReplyDeleteParams,
  CommentReplySearchEntity,
  CommentReplyUpdateParams,
  CommentSearchEntity,
  CommentUpdateParams,
} from '@core/entities';
import {
  BlogPostDetailModel,
  BlogPostAnchorModel,
  BlogPostCommentCreateParamsModel,
  BlogPostCommentUpdateParamsModel,
  BlogPostCommentDeleteParamsModel,
  BlogPostCommentSearchModel,
  BlogPostCommentReplySearchModel,
  BlogPostCommentReplyCreateParamsModel,
  BlogPostCommentReplyDeleteParamsModel,
  BlogPostCommentReplyUpdateParamsModel,
} from '../models';
import {
  toBlogPostCategoryModel,
  refinePostCreatedAt,
  refinePostReadingTime,
} from './blog.convert';

export function refineBlogPostDetailCommentParams(raw: Record<string, string>) {
  return {
    postId: isFinite(Number(raw['id'])) ? Number(raw['id']) : 0,
    notificationId: raw['notification'],
  };
}

export function toBlogPostDetailModel(
  detail: BlogPostDetailEntity,
): BlogPostDetailModel {
  return {
    ...detail,
    category: toBlogPostCategoryModel(detail.category, detail.subCategory),
    createdAt: refinePostCreatedAt(detail.createdAt),
    readTime: refinePostReadingTime(detail.readTime),
  };
}

export function extractHeadingText(): BlogPostAnchorModel[] {
  if (env.isSSR) {
    return [];
  }

  const anchors: BlogPostAnchorModel[] = [];

  document
    .querySelectorAll('h1')
    .forEach((element) =>
      anchors.push({ id: element.id, value: element.textContent || '' }),
    );

  return anchors.slice(1, anchors.length);
}

export function toBlogPostCommentReplySearchModels(
  entities: CommentReplySearchEntity[],
): BlogPostCommentReplySearchModel[] {
  return entities.map((entity) => {
    const {
      createdAt,
      deletedAt,
      id,
      isAnonymous,
      userId,
      value,
      username = '익명',
    } = entity;

    return {
      createdAt,
      deletedAt: deletedAt ?? '',
      id,
      isAnonymous,
      password: '',
      userId: userId ?? '',
      username,
      value,
    };
  });
}

export function toBlogPostCommentSearchModels(
  entities: CommentSearchEntity[],
): BlogPostCommentSearchModel[] {
  return entities.map((entity) => {
    const {
      commentReplies,
      createdAt,
      deletedAt,
      id,
      isAnonymous,
      userId,
      value,
      username = '익명',
    } = entity;

    return {
      id,
      isAnonymous,
      commentReplies: toBlogPostCommentReplySearchModels(commentReplies),
      createdAt,
      username,
      value,
      deletedAt: deletedAt ?? '',
      userId: userId ?? '',
      password: '',
    };
  });
}

export function toCommentCreateParams(
  params: BlogPostCommentCreateParamsModel,
): CommentCreateParams {
  return {
    postId: Number(params.postId),
    value: params.commentValue,
    username: params.username,
    password: params.password,
  };
}

export function toCommentUpdateParams(
  params: BlogPostCommentUpdateParamsModel,
): CommentUpdateParams {
  return {
    id: params.commentId,
    postId: Number(params.postId),
    value: params.commentValue,
    username: params.username,
    password: params.password,
  };
}

export function toCommentDeleteParams(
  params: BlogPostCommentDeleteParamsModel,
): CommentDeleteParams {
  return {
    id: params.commentId,
    password: params.password,
  };
}

export function toCommentReplyCreateParams(
  params: BlogPostCommentReplyCreateParamsModel,
): CommentReplyCreateParams {
  return {
    commentId: params.commentId,
    postId: params.postId,
    value: params.commentValue,
    username: params.username,
    password: params.password,
  };
}

export function toCommentReplyUpdateParams(
  params: BlogPostCommentReplyUpdateParamsModel,
): CommentReplyUpdateParams {
  return {
    postId: params.postId,
    id: params.commentId,
    value: params.commentValue,
    username: params.username,
    password: params.password,
  };
}

export function toCommentReplyDeleteParams(
  params: BlogPostCommentReplyDeleteParamsModel,
): CommentReplyDeleteParams {
  return {
    id: params.commentId,
    password: params.password,
  };
}