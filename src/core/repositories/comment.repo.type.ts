import {
  CommentCreateParams,
  CommentDeleteParams,
  CommentExistEntity,
  CommentReplyCreateParams,
  CommentReplyDeleteParams,
  CommentReplyExistEntity,
  CommentReplyUpdateParams,
  CommentSearchEntity,
  CommentUpdateParams,
  PromisePrismaResolveResponse,
} from '@core/entities';

export interface CommentRepository {
  /**
   * 댓글을 가져온다
   *
   * @param postId
   * @returns
   */
  fetchComments(
    postId: number,
  ): PromisePrismaResolveResponse<CommentSearchEntity[]>;

  /**
   * 댓글을 생성한다.
   *
   * @param params
   * @returns
   */
  createComment(params: CommentCreateParams): PromisePrismaResolveResponse;

  /**
   * 댓글을 수정한다.
   *
   * @param params
   * @returns
   */
  updateComment(params: CommentUpdateParams): PromisePrismaResolveResponse;

  /**
   * 댓글을 삭제한다.
   *
   * @param params
   * @returns
   */
  deleteComment(params: CommentDeleteParams): PromisePrismaResolveResponse;

  /**
   * 하위 댓글을 생성한다.
   * @param params
   * @returns
   */
  createCommentReply(
    params: CommentReplyCreateParams,
  ): PromisePrismaResolveResponse;

  /**
   * 하위 댓글을 수정한다.
   * @param params
   * @returns
   */
  updateCommentReply(
    params: CommentReplyUpdateParams,
  ): PromisePrismaResolveResponse;

  /**
   * 하위 댓글을 삭제한다.
   * @param params
   * @returns
   */
  deleteCommentReply(
    params: CommentReplyDeleteParams,
  ): PromisePrismaResolveResponse;

  /**
   * 댓글이 존재하는지 확인한다.
   *
   * @param id
   */
  existComment(
    id: string,
  ): PromisePrismaResolveResponse<CommentExistEntity | null>;

  /**
   * 대댓글이 존재하는지 확인한다.
   *
   * @param id
   */
  existCommentReply(
    id: string,
  ): PromisePrismaResolveResponse<CommentReplyExistEntity | null>;
}
