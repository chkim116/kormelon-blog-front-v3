import {
  CommentCreateParams,
  CommentDeleteParams,
  CommentReplyCreateParams,
  CommentReplyDeleteParams,
  CommentReplyUpdateParams,
  CommentSearchEntity,
  CommentUpdateParams,
  ResponseWithFetch,
} from '@shared/entities';

export interface CommentRepository {
  /**
   * 댓글을 가져온다
   *
   * @param postId
   * @returns
   */
  fetchComments(postId: number): ResponseWithFetch<CommentSearchEntity[]>;

  /**
   * 댓글을 생성한다.
   *
   * @param params
   * @returns
   */
  createComment(params: CommentCreateParams): ResponseWithFetch<void>;

  /**
   * 댓글을 수정한다.
   *
   * @param params
   * @returns
   */
  updateComment(params: CommentUpdateParams): ResponseWithFetch<void>;

  /**
   * 댓글을 삭제한다.
   *
   * @param params
   * @returns
   */
  deleteComment(params: CommentDeleteParams): ResponseWithFetch<void>;

  /**
   * 하위 댓글을 가져온다.
   *
   * @param commentId
   * @returns
   */
  fetchCommentReplies(commentId: string): ResponseWithFetch<void>;

  /**
   * 하위 댓글을 생성한다.
   * @param params
   * @returns
   */
  createCommentReply(params: CommentReplyCreateParams): ResponseWithFetch<void>;

  /**
   * 하위 댓글을 수정한다.
   * @param params
   * @returns
   */
  updateCommentReply(params: CommentReplyUpdateParams): ResponseWithFetch<void>;

  /**
   * 하위 댓글을 삭제한다.
   * @param params
   * @returns
   */
  deleteCommentReply(params: CommentReplyDeleteParams): ResponseWithFetch<void>;
}
