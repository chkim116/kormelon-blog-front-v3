import { PostDetailRepository } from '@core/repositories/post.repo.type';
import { BlogDetailPayloadData } from './blogDetail.uiState';
import {
  toBlogDetailNearUiState,
  toBlogDetailUiState,
} from './blogDetail.convert';

interface BlogDetailServiceModel {
  /**
   * 게시글 상세 조회
   *
   * @param id 게시글 식별자
   */
  fetchBlogDetail(id: number): Promise<BlogDetailPayloadData>;
  /**
   * 비밀 게시글 상세 조회
   *
   * @param id 게시글 식별자
   */
  fetchPrivateBlogDetail(id: number): Promise<BlogDetailPayloadData>;
  /**
   * 게시글 좋아요
   */
  addLike(id: number): Promise<void>;
  /**
   * 게시글 좋아요 여부
   *
   * @param postId 게시글 식별자
   */
  checkLike(postId: number): boolean;
  /**
   * 방문자 수 카운트
   */
  addVisit(id: number): Promise<void>;
  /**
   * 게시글 삭제
   */
  deleteBlog(id: number): Promise<void>;
}

export class BlogDetailServiceImpl implements BlogDetailServiceModel {
  constructor(private postRepo: PostDetailRepository) {}

  checkLike(postId: number): boolean {
    return this.postRepo.checkLike(postId);
  }

  async fetchBlogDetail(id: number): Promise<BlogDetailPayloadData> {
    const { payload } = await this.postRepo.fetchPostById(id);

    return {
      blog: toBlogDetailUiState(payload.post),
      next: toBlogDetailNearUiState(payload.next),
      prev: toBlogDetailNearUiState(payload.prev),
    };
  }

  async fetchPrivateBlogDetail(id: number): Promise<BlogDetailPayloadData> {
    const { payload } = await this.postRepo.fetchPrivatePostById(id);

    return {
      blog: toBlogDetailUiState(payload.post),
      next: toBlogDetailNearUiState(payload.next),
      prev: toBlogDetailNearUiState(payload.prev),
    };
  }

  async addLike(id: number): Promise<void> {
    await this.postRepo.addLikePost(id);
  }

  async addVisit(id: number): Promise<void> {
    await this.postRepo.addPostView(id);
  }

  async deleteBlog(id: number): Promise<void> {
    await this.postRepo.deletePost(id);
  }
}
