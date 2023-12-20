import { CommentRepository } from '@features/blog/repositories/comment.repo.type';
import {
  CommentCreateUiParams,
  CommentDeleteUiParams,
  CommentReplyCreateUiParams,
  CommentReplyDeleteUiParams,
  CommentReplyUpdateUiParams,
  CommentSearchUiParams,
  CommentSearchUiState,
  CommentUpdateUiParams,
} from './comment.uiState';
import {
  refineCommentSearchUiParams,
  toCommentCreateParams,
  toCommentDeleteParams,
  toCommentReplyCreateParams,
  toCommentReplyDeleteParams,
  toCommentReplyUpdateParams,
  toCommentSearchUiStates,
  toCommentUpdateParams,
} from './comment.convert';

interface CommentService {
  /**
   * 현 쿼리 파라미터를 치환
   */
  refineQueryParams(raw: Record<string, string>): CommentSearchUiParams;
  /**
   * 댓글 조회
   *
   * @param postId 게시글 식별자
   */
  fetchComments(postId: number): Promise<CommentSearchUiState[]>;
  /**
   * 현 게시글에 댓글 생성
   */
  createComment(params: CommentCreateUiParams): Promise<CommentSearchUiState[]>;
  /**
   * 댓글 수정
   */
  updateComment(params: CommentUpdateUiParams): Promise<CommentSearchUiState[]>;
  /**
   * 댓글 삭제
   */
  deleteComment(params: CommentDeleteUiParams): Promise<CommentSearchUiState[]>;
  /**
   * 댓글에 댓글 작성
   */
  createReply(
    params: CommentReplyCreateUiParams,
  ): Promise<CommentSearchUiState[]>;
  /**
   * 대댓글 수정
   */
  updateReply(
    params: CommentReplyUpdateUiParams,
  ): Promise<CommentSearchUiState[]>;
  /**
   * 대댓글 삭제
   */
  deleteReply(
    params: CommentReplyDeleteUiParams,
  ): Promise<CommentSearchUiState[]>;
}

export class CommentServiceImpl implements CommentService {
  constructor(private commentRepo: CommentRepository) {}
  refineQueryParams(raw: Record<string, string>): CommentSearchUiParams {
    try {
      return refineCommentSearchUiParams(raw);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async fetchComments(postId: number): Promise<CommentSearchUiState[]> {
    const { payload } = await this.commentRepo.fetchComments(postId);

    return toCommentSearchUiStates(payload);
  }

  async createComment(
    params: CommentCreateUiParams,
  ): Promise<CommentSearchUiState[]> {
    await this.commentRepo.createComment(toCommentCreateParams(params));

    return await this.fetchComments(params.postId);
  }

  async updateComment(
    params: CommentUpdateUiParams,
  ): Promise<CommentSearchUiState[]> {
    await this.commentRepo.updateComment(toCommentUpdateParams(params));

    return await this.fetchComments(params.postId);
  }

  async deleteComment(
    params: CommentDeleteUiParams,
  ): Promise<CommentSearchUiState[]> {
    await this.commentRepo.deleteComment(toCommentDeleteParams(params));

    return await this.fetchComments(params.postId);
  }

  async createReply(
    params: CommentReplyCreateUiParams,
  ): Promise<CommentSearchUiState[]> {
    await this.commentRepo.createCommentReply(
      toCommentReplyCreateParams(params),
    );

    return await this.fetchComments(params.postId);
  }

  async updateReply(
    params: CommentReplyUpdateUiParams,
  ): Promise<CommentSearchUiState[]> {
    await this.commentRepo.updateCommentReply(
      toCommentReplyUpdateParams(params),
    );

    return await this.fetchComments(params.postId);
  }

  async deleteReply(
    params: CommentReplyDeleteUiParams,
  ): Promise<CommentSearchUiState[]> {
    await this.commentRepo.deleteCommentReply(
      toCommentReplyDeleteParams(params),
    );

    return await this.fetchComments(params.postId);
  }
}
