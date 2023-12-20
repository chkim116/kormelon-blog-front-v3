import { PostWriteRepository } from '@features/blog/repositories/post.repo.type';
import { HttpError } from '@core/network/HttpError';
import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests';
import {
  toPostCreateParams,
  toPostUpdateParams,
} from '../write/blogWrite.convert';
import { createBlogWriteCreateUiParams } from '../write/blogWrite.create';
import { BlogWriteService } from '../write/blogWrite.service';
import { BlogWriteUpdateUiParams } from '../write/blogWrite.uiState';

const IMAGE_RESPONSE = 'url';

const postWriteRepositoryMock: PostWriteRepository = {
  createPost: createMockFunctionWithResolvedValue(),
  updatePost: createMockFunctionWithResolvedValue(),
  deletePost: jest.fn(),
  uploadImage: createMockFunctionWithResolvedValue(IMAGE_RESPONSE),
};

const blogWriteService = new BlogWriteService(postWriteRepositoryMock);

describe('BlogWriteService 성공 케이스', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('현 쿼리 파라미터 치환', () => {
    const raw = { editId: '123', isPrivateMode: undefined };

    const result = blogWriteService.refineQueryParams(raw);

    expect(result).toEqual({ editId: 123, isPrivateMode: false });
  });

  it('블로그 생성', async () => {
    const params = createBlogWriteCreateUiParams();
    await blogWriteService.createBlog(params);

    expect(postWriteRepositoryMock.createPost).toHaveBeenCalledWith(
      toPostCreateParams(params),
    );
  });

  it('블로그 수정', async () => {
    const params: BlogWriteUpdateUiParams = {
      id: 1,
      ...createBlogWriteCreateUiParams(),
    };

    await blogWriteService.updateBlog(params);

    expect(postWriteRepositoryMock.updatePost).toHaveBeenCalledWith(
      toPostUpdateParams(params),
    );
  });

  it('이미지 업로드', async () => {
    const file = new File([], IMAGE_RESPONSE);
    const fd = new FormData();
    fd.append('image', file);

    const result = await blogWriteService.uploadImage(fd);

    expect(postWriteRepositoryMock.uploadImage).toHaveBeenCalledWith(fd);
    expect(result).toEqual(IMAGE_RESPONSE);
  });
});

describe('BlogWriteService 실패 케이스', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('블로그 생성 실패', async () => {
    postWriteRepositoryMock.createPost = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );

    await expect(
      blogWriteService.createBlog(createBlogWriteCreateUiParams()),
    ).rejects.toMatchObject({
      message: '에러 발생',
    });
  });

  it('블로그 수정 실패', async () => {
    postWriteRepositoryMock.updatePost = createMockFunctionWithRejectedValue(
      new HttpError('에러 발생'),
    );

    const params: BlogWriteUpdateUiParams = {
      id: 1,
      ...createBlogWriteCreateUiParams(),
    };
    await expect(blogWriteService.updateBlog(params)).rejects.toMatchObject({
      message: '에러 발생',
    });
  });
});
