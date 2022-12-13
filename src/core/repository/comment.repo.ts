import {
  CommentCreateParams,
  CommentDeleteParams,
  CommentReplyCreateParams,
  CommentReplyDeleteParams,
  CommentReplyUpdateParams,
  CommentSearchEntity,
  CommentUpdateParams,
  Response,
} from '@core/entities';
import { apiClient } from '@core/network';

export const commentRepository = {
  /**
   * 댓글을 가져온다
   *
   * @param postId
   * @returns
   */
  fetchComments(postId: number) {
    return apiClient.get<Response<CommentSearchEntity[]>>(
      `/comment?postId=${postId}`,
    );
  },

  /**
   * 댓글을 생성한다.
   *
   * @param params
   * @returns
   */
  createComment(params: CommentCreateParams) {
    return apiClient.post('/comment', params);
  },

  /**
   * 댓글을 수정한다.
   *
   * @param params
   * @returns
   */
  updateComment(params: CommentUpdateParams) {
    return apiClient.put('/comment', params);
  },

  /**
   * 댓글을 삭제한다.
   *
   * @param params
   * @returns
   */
  deleteComment(params: CommentDeleteParams) {
    return apiClient.delete(
      `/comment?id=${params.id}&password=${params.password}`,
    );
  },

  /**
   * 하위 댓글을 가져온다.
   *
   * @param commentId
   * @returns
   */
  fetchCommentReplies(commentId: string) {
    return apiClient.get(`/comment/reply?commentId=${commentId}`);
  },

  /**
   * 하위 댓글을 생성한다.
   * @param params
   * @returns
   */
  createCommentReply(params: CommentReplyCreateParams) {
    return apiClient.post('/comment/reply', params);
  },

  /**
   * 하위 댓글을 수정한다.
   * @param params
   * @returns
   */
  updateCommentReply(params: CommentReplyUpdateParams) {
    return apiClient.put('/comment/reply', params);
  },

  /**
   * 하위 댓글을 삭제한다.
   * @param params
   * @returns
   */
  deleteCommentReply(params: CommentReplyDeleteParams) {
    return apiClient.delete(
      `/comment/reply?id=${params.id}&password=${params.password}`,
    );
  },
};
