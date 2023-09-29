import dayjs from 'dayjs';
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
} from '@server/entities';
import { env } from '@core/env';
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
} from '../uiStates';
import {
  toBlogPostCategoryModel,
  refinePostCreatedAt,
  refinePostReadingTime,
} from './blog.convert';
import { createCommentProfileImage } from './blogDetail.create';

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

  // TODO: dom 의존하지 않도록 변경
  document
    ?.getElementById('blogContent')
    ?.querySelectorAll('h2')
    .forEach((element) => {
      element.id = element.textContent || '';
      anchors.push({
        id: `#${element.id}`,
        value: element.textContent || '',
        position: element.offsetTop,
      });
    });

  return anchors;
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
      user,
      username = '익명',
    } = entity;

    const userProfile =
      user?.profileImage ?? createCommentProfileImage(username);

    return {
      createdAt: dayjs(createdAt).format('YYYY-MM-DD'),
      deletedAt: deletedAt ?? '',
      id,
      isAnonymous,
      userProfile,
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
      user,
      username = '익명',
    } = entity;

    const userProfile =
      user?.profileImage ?? createCommentProfileImage(username);

    return {
      id,
      isAnonymous,
      commentReplies: toBlogPostCommentReplySearchModels(commentReplies),
      userProfile,
      createdAt: dayjs(createdAt).format('YYYY-MM-DD'),
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
