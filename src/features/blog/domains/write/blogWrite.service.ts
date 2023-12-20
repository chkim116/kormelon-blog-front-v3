import { PostWriteRepository } from '@features/blog/repositories/post.repo.type';
import {
  BlogWriteCreateUiParams,
  BlogWriteUiParams,
  BlogWriteUpdateUiParams,
} from './blogWrite.uiState';
import {
  refineBlogWriteUiParams,
  toPostCreateParams,
  toPostUpdateParams,
} from './blogWrite.convert';

interface BlogWriteServiceModel {
  /**
   * 현 쿼리 파라미터 값을 원하는 형태로 치환
   */
  refineQueryParams(raw: Record<string, string>): BlogWriteUiParams;
  /**
   * 블로그 생성
   */
  createBlog(params: BlogWriteCreateUiParams): Promise<void>;
  /**
   * 블로그 수정
   */
  updateBlog(params: BlogWriteUpdateUiParams): Promise<void>;
  /**
   * 이미지 업로드
   *
   * FormData에 `image`가 Key값으로 있어야 한다.
   *
   */
  uploadImage(fd: FormData): Promise<string>;
}

export class BlogWriteService implements BlogWriteServiceModel {
  constructor(private postRepo: PostWriteRepository) {}

  refineQueryParams(raw: Record<string, unknown>): BlogWriteUiParams {
    try {
      return refineBlogWriteUiParams(raw);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async createBlog(params: BlogWriteCreateUiParams): Promise<void> {
    await this.postRepo.createPost(toPostCreateParams(params));
  }

  async updateBlog(params: BlogWriteUpdateUiParams): Promise<void> {
    await this.postRepo.updatePost(toPostUpdateParams(params));
  }

  async uploadImage(fd: FormData): Promise<string> {
    const { payload } = await this.postRepo.uploadImage(fd);

    return payload;
  }
}
