import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests';
import {
  PostDetailEntity,
  PostDetailResultEntityPayload,
} from '@core/entities';
import { HttpError } from '@core/network/HttpError';
import { PostDetailRepository } from '@core/repositories/post.repo.type';
import {
  toBlogDetailUiState,
  toBlogDetailNearUiState,
} from '../detail/blogDetail.convert';
import { BlogDetailServiceImpl } from '../detail/blogDetail.service';

const mockBlogDetailEntity: PostDetailEntity = {
  category: { id: 1, value: '카테고리' },
  content: '',
  createdAt: new Date(),
  isPrivate: false,
  id: 1,
  like: 0,
  preview: '',
  readTime: 0,
  subCategory: { id: 1, value: '서브' },
  tags: [],
  thumbnail: '',
  title: '',
  user: {
    id: '1',
    profileImage: '',
    username: '',
  },
  view: 0,
};

const RESPONSE_POST_BY_ID: PostDetailResultEntityPayload = {
  post: mockBlogDetailEntity,
  next: null,
  prev: null,
};

const postDetailRepositoryMock: PostDetailRepository = {
  fetchPostById: createMockFunctionWithResolvedValue(RESPONSE_POST_BY_ID),
  fetchPrivatePostById:
    createMockFunctionWithResolvedValue(RESPONSE_POST_BY_ID),
  addLikePost: createMockFunctionWithResolvedValue(),
  checkLike: jest.fn().mockReturnValue(true),
  addPostView: createMockFunctionWithResolvedValue(),
  deletePost: createMockFunctionWithResolvedValue(),
};

const blogDetailService = new BlogDetailServiceImpl(postDetailRepositoryMock);

describe('blogDetailService 성공 케이스', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('게시글 상세 조회', async () => {
    const result = await blogDetailService.fetchBlogDetail(
      RESPONSE_POST_BY_ID.post.id,
    );

    expect(postDetailRepositoryMock.fetchPostById).toHaveBeenCalledWith(
      RESPONSE_POST_BY_ID.post.id,
    );
    expect(result).toEqual({
      blog: toBlogDetailUiState(RESPONSE_POST_BY_ID.post),
      prev: toBlogDetailNearUiState(RESPONSE_POST_BY_ID.prev),
      next: toBlogDetailNearUiState(RESPONSE_POST_BY_ID.next),
    });
  });

  it('비밀 게시글 상세 조회', async () => {
    const result = await blogDetailService.fetchPrivateBlogDetail(
      RESPONSE_POST_BY_ID.post.id,
    );

    expect(postDetailRepositoryMock.fetchPrivatePostById).toHaveBeenCalledWith(
      RESPONSE_POST_BY_ID.post.id,
    );
    expect(result).toEqual({
      blog: toBlogDetailUiState(RESPONSE_POST_BY_ID.post),
      prev: toBlogDetailNearUiState(RESPONSE_POST_BY_ID.prev),
      next: toBlogDetailNearUiState(RESPONSE_POST_BY_ID.next),
    });
  });

  it('게시글 좋아요', async () => {
    const id = 1;

    await blogDetailService.addLike(id);
    expect(postDetailRepositoryMock.addLikePost).toHaveBeenCalledWith(id);
  });

  it('게시글 방문자 수 증가', async () => {
    const id = 1;

    await blogDetailService.addVisit(id);
    expect(postDetailRepositoryMock.addPostView).toHaveBeenCalledWith(id);
  });

  it('게시글 삭제', async () => {
    const id = 1;

    await blogDetailService.deleteBlog(id);
    expect(postDetailRepositoryMock.deletePost).toHaveBeenCalledWith(id);
  });

  it('게시글 좋아요 여부 확인', () => {
    const postId = 1;

    const result = blogDetailService.checkLike(postId);

    expect(postDetailRepositoryMock.checkLike).toHaveBeenCalledWith(postId);
    expect(result).toBe(true);
  });
});

describe('blogDetailService 실패 케이스', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('게시글 상세 조회 실패', async () => {
    postDetailRepositoryMock.fetchPostById =
      createMockFunctionWithRejectedValue(new HttpError('에러 발생'));

    await expect(blogDetailService.fetchBlogDetail(1)).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postDetailRepositoryMock.fetchPostById).toHaveBeenCalledWith(1);
  });

  it('비밀 게시글 상세 조회 실패', async () => {
    postDetailRepositoryMock.fetchPrivatePostById =
      createMockFunctionWithRejectedValue(new HttpError('에러 발생'));
    const id = 1;

    await expect(
      blogDetailService.fetchPrivateBlogDetail(id),
    ).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postDetailRepositoryMock.fetchPrivatePostById).toHaveBeenCalledWith(
      id,
    );
  });

  it('게시글 좋아요 실패', async () => {
    postDetailRepositoryMock.addLikePost = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );

    const id = 1;

    await expect(blogDetailService.addLike(id)).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postDetailRepositoryMock.addLikePost).toHaveBeenCalledWith(id);
  });

  it('게시글 방문자 수 증가 실패', async () => {
    postDetailRepositoryMock.addPostView = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );

    const id = 1;

    await expect(blogDetailService.addVisit(id)).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postDetailRepositoryMock.addPostView).toHaveBeenCalledWith(id);
  });

  it('게시글 삭제 실패', async () => {
    postDetailRepositoryMock.deletePost = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );

    await expect(blogDetailService.deleteBlog(1)).rejects.toMatchObject({
      message: '에러 발생',
    });
    expect(postDetailRepositoryMock.deletePost).toHaveBeenCalledWith(1);
  });
});
