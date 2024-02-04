import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests';
import { CommentSearchEntity } from '@server/entities';
import { HttpError } from '@core/network/HttpError';
import { CommentRepository } from '@server/repositories/types/comment.repo.type';
import {
  refineCommentSearchUiParams,
  toCommentCreateParams,
  toCommentDeleteParams,
  toCommentReplyCreateParams,
  toCommentReplyDeleteParams,
  toCommentReplyUpdateParams,
  toCommentSearchUiStates,
  toCommentUpdateParams,
} from '../comment.convert';
import { CommentServiceImpl } from '../comment.service';
import {
  CommentCreateUiParams,
  CommentDeleteUiParams,
  CommentReplyCreateUiParams,
  CommentReplyDeleteUiParams,
  CommentReplyUpdateUiParams,
  CommentUpdateUiParams,
} from '../comment.uiState';

const commentRepository: CommentRepository = {
  fetchComments: jest.fn(),
  fetchCommentReplies: jest.fn(),
  createComment: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
  createCommentReply: jest.fn(),
  updateCommentReply: jest.fn(),
  deleteCommentReply: jest.fn(),
};

const commentService = new CommentServiceImpl(commentRepository);

describe('CommentService 성공 케이스', () => {
  const responseComments: CommentSearchEntity[] = [
    {
      id: '1',
      createdAt: '2017-01-01',
      user: {
        profileImage: 'profileImage',
      },
      userId: 'userId',
      username: 'user',
      value: 'comment',
      deletedAt: null,
      isAnonymous: false,
      commentReplies: [],
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('현 쿼리 파라미터 치환', () => {
    const raw = { notificationId: '123', postId: '1' };

    const result = commentService.refineQueryParams(raw);

    expect(result).toEqual(refineCommentSearchUiParams(raw));
  });

  it('댓글 조회', async () => {
    commentRepository.fetchComments =
      createMockFunctionWithResolvedValue(responseComments);

    const postId = 1;

    const results = await commentService.fetchComments(postId);

    expect(commentRepository.fetchComments).toHaveBeenCalledWith(postId);
    expect(results).toEqual(toCommentSearchUiStates(responseComments));
  });

  it('댓글 생성', async () => {
    commentRepository.createComment = createMockFunctionWithResolvedValue();
    commentRepository.fetchComments =
      createMockFunctionWithResolvedValue(responseComments);

    const params: CommentCreateUiParams = {
      postId: 1,
      commentValue: 'comment',
      password: '',
      username: 'user',
    };

    const results = await commentService.createComment(params);
    expect(commentRepository.createComment).toHaveBeenCalledWith(
      toCommentCreateParams(params),
    );
    expect(commentRepository.fetchComments).toHaveBeenCalledWith(params.postId);
    expect(results).toEqual(toCommentSearchUiStates(responseComments));
  });

  it('댓글 수정', async () => {
    commentRepository.updateComment = createMockFunctionWithResolvedValue();
    commentRepository.fetchComments =
      createMockFunctionWithResolvedValue(responseComments);

    const params: CommentUpdateUiParams = {
      commentId: '1',
      postId: 1,
      commentValue: 'comment',
      password: '',
    };

    const results = await commentService.updateComment(params);
    expect(commentRepository.updateComment).toHaveBeenCalledWith(
      toCommentUpdateParams(params),
    );
    expect(commentRepository.fetchComments).toHaveBeenCalledWith(params.postId);
    expect(results).toEqual(toCommentSearchUiStates(responseComments));
  });

  it('댓글 삭제', async () => {
    commentRepository.deleteComment = createMockFunctionWithResolvedValue();
    commentRepository.fetchComments =
      createMockFunctionWithResolvedValue(responseComments);

    const params: CommentDeleteUiParams = {
      commentId: '1',
      postId: 1,
      password: '',
    };

    const results = await commentService.deleteComment(params);
    expect(commentRepository.deleteComment).toHaveBeenCalledWith(
      toCommentDeleteParams(params),
    );
    expect(commentRepository.fetchComments).toHaveBeenCalledWith(params.postId);
    expect(results).toEqual(toCommentSearchUiStates(responseComments));
  });

  it('대댓글 생성', async () => {
    commentRepository.createCommentReply =
      createMockFunctionWithResolvedValue();
    commentRepository.fetchComments =
      createMockFunctionWithResolvedValue(responseComments);

    const params: CommentReplyCreateUiParams = {
      commentId: '1',
      postId: 1,
      commentValue: 'comment',
      password: '',
      username: 'user',
    };

    const results = await commentService.createReply(params);
    expect(commentRepository.createCommentReply).toHaveBeenCalledWith(
      toCommentReplyCreateParams(params),
    );
    expect(commentRepository.fetchComments).toHaveBeenCalledWith(params.postId);
    expect(results).toEqual(toCommentSearchUiStates(responseComments));
  });

  it('대댓글 수정', async () => {
    commentRepository.updateCommentReply =
      createMockFunctionWithResolvedValue();
    commentRepository.fetchComments =
      createMockFunctionWithResolvedValue(responseComments);

    const params: CommentReplyUpdateUiParams = {
      commentId: '1',
      postId: 1,
      commentValue: 'comment',
      password: '',
    };

    const results = await commentService.updateReply(params);
    expect(commentRepository.updateCommentReply).toHaveBeenCalledWith(
      toCommentReplyUpdateParams(params),
    );
    expect(commentRepository.fetchComments).toHaveBeenCalledWith(params.postId);
    expect(results).toEqual(toCommentSearchUiStates(responseComments));
  });

  it('대댓글 삭제', async () => {
    commentRepository.deleteCommentReply =
      createMockFunctionWithResolvedValue();
    commentRepository.fetchComments =
      createMockFunctionWithResolvedValue(responseComments);

    const params: CommentReplyDeleteUiParams = {
      commentId: '1',
      postId: 1,
      password: '',
    };

    const results = await commentService.deleteReply(params);
    expect(commentRepository.deleteCommentReply).toHaveBeenCalledWith(
      toCommentReplyDeleteParams(params),
    );
    expect(commentRepository.fetchComments).toHaveBeenCalledWith(params.postId);
    expect(results).toEqual(toCommentSearchUiStates(responseComments));
  });
});

describe('CommentService 실패 케이스', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('댓글 조회 실패', async () => {
    commentRepository.fetchComments = createMockFunctionWithRejectedValue(
      new HttpError('실패'),
    );

    await expect(() => commentService.fetchComments(1)).rejects.toMatchObject({
      message: '실패',
    });
  });

  it('댓글 생성 실패', async () => {
    commentRepository.createComment = createMockFunctionWithRejectedValue(
      new Error('실패'),
    );

    const params = {} as never;

    await expect(() =>
      commentService.createComment(params),
    ).rejects.toMatchObject({
      message: '실패',
    });
    expect(commentRepository.createComment).toHaveBeenCalledWith(
      toCommentCreateParams(params),
    );
  });
});
