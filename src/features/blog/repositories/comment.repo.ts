import { authApiServer, baseApiServer } from '@core/server/apiServer';
import {
  CommentCreateParams,
  CommentDeleteParams,
  CommentReplyCreateParams,
  CommentReplyDeleteParams,
  CommentReplyUpdateParams,
  CommentSearchEntity,
  CommentUpdateParams,
  Response,
} from '@shared/entities';
import { CommentRepository } from './comment.repo.type';

class CommentRepositoryImpl implements CommentRepository {
  /**
   * 댓글을 가져온다
   *
   * @param postId
   * @returns
   */
  fetchComments(postId: number) {
    return baseApiServer<Response<CommentSearchEntity[]>>(
      `/comment?postId=${postId}`,
      {
        method: 'GET',
      },
    );
  }

  /**
   * 댓글을 생성한다.
   *
   * @param params
   * @returns
   */
  createComment(params: CommentCreateParams) {
    return authApiServer('/comment', { method: 'POST', body: params });
  }

  /**
   * 댓글을 수정한다.
   *
   * @param params
   * @returns
   */
  updateComment(params: CommentUpdateParams) {
    return authApiServer('/comment', { method: 'PUT', body: params });
  }

  /**
   * 댓글을 삭제한다.
   *
   * @param params
   * @returns
   */
  deleteComment(params: CommentDeleteParams) {
    return authApiServer(
      `/comment?id=${params.id}&password=${params.password}`,
      { method: 'DELETE' },
    );
  }

  /**
   * 하위 댓글을 가져온다.
   *
   * @param commentId
   * @returns
   */
  fetchCommentReplies(commentId: string) {
    return baseApiServer(`/comment/reply?commentId=${commentId}`, {
      method: 'GET',
    });
  }

  /**
   * 하위 댓글을 생성한다.
   * @param params
   * @returns
   */
  createCommentReply(params: CommentReplyCreateParams) {
    return authApiServer('/comment/reply', { method: 'POST', body: params });
  }

  /**
   * 하위 댓글을 수정한다.
   * @param params
   * @returns
   */
  updateCommentReply(params: CommentReplyUpdateParams) {
    return authApiServer('/comment/reply', { method: 'PUT', body: params });
  }

  /**
   * 하위 댓글을 삭제한다.
   * @param params
   * @returns
   */
  deleteCommentReply(params: CommentReplyDeleteParams) {
    return authApiServer(
      `/comment/reply?id=${params.id}&password=${params.password}`,
      {
        method: 'DELETE',
      },
    );
  }
}

export const commentRepository = new CommentRepositoryImpl();
