import { calcTotalPage } from '@shared/utils/calcTotalPage';
import { DEFAULT_PER } from '@shared/constants/page.const';
import { PostRssEntity } from '@shared/entities';
import { PostSearchRepository } from '@features/blog/repositories/post.repo.type';
import {
  BlogPrivateSearchPayloadData,
  BlogSearchPayloadData,
  BlogSearchUiParams,
  BlogSearchUiState,
} from './blogSearch.uiState';
import {
  refineBlogSearchUiParams,
  toBlogSearchPrivateUiStates,
  toBlogSearchUiStates,
  toPostSearchParams,
} from './blogSearch.convert';

interface BlogSearchServiceModel {
  /**
   * 현 쿼리파라미터 치환
   */
  refineQueryParams(raw: Record<string, unknown>): BlogSearchUiParams;
  /**
   * 블로그 글 호출
   *
   * @returns {blogs} - 블로그 글
   * @returns {total} - 총 개수
   * @returns {totalPage} - 총 페이지 개수
   */
  fetchBlogs(params: BlogSearchUiParams): Promise<BlogSearchPayloadData>;
  /**
   * 비밀 게시글 호출
   *
   * @returns 블로그 글 호출과 동일함
   */
  fetchPrivateBlogs(): Promise<BlogPrivateSearchPayloadData>;
  /**
   * 추천 게시글 상세 조회
   */
  fetchRecommends(excludeId: number): Promise<BlogSearchUiState[]>;
  /**
   * rss 피드용 게시글 조회
   */
  fetchRss(): Promise<PostRssEntity[]>;
}

export class BlogSearchServiceImpl implements BlogSearchServiceModel {
  constructor(private postRepo: PostSearchRepository) {}

  async fetchRss(): Promise<PostRssEntity[]> {
    const { payload } = await this.postRepo.fetchPostRss();

    return payload;
  }

  refineQueryParams(raw: Record<string, unknown>): BlogSearchUiParams {
    try {
      return refineBlogSearchUiParams(raw);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async fetchBlogs(params: BlogSearchUiParams): Promise<BlogSearchPayloadData> {
    const { payload, meta } = await this.postRepo.fetchPosts(
      toPostSearchParams(params),
    );

    return {
      blogs: toBlogSearchUiStates(payload),
      total: meta.total,
      totalPage: calcTotalPage(meta.total, params.per),
    };
  }

  async fetchPrivateBlogs(): Promise<BlogPrivateSearchPayloadData> {
    const { payload, meta } = await this.postRepo.fetchPrivatePosts();

    return {
      blogs: toBlogSearchPrivateUiStates(payload),
      total: meta.total,
      totalPage: calcTotalPage(meta.total, DEFAULT_PER),
    };
  }

  async fetchRecommends(excludeId: number): Promise<BlogSearchUiState[]> {
    const { payload } = await this.postRepo.fetchRecommendPosts(excludeId, 6);

    return toBlogSearchUiStates(payload);
  }
}
