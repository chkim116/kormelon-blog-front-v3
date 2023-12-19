import {
  PagingMeta,
  PostCreateParams,
  PostDetailResultEntityPayload,
  PostPrivateSearchEntity,
  PostRecommendEntity,
  PostRssEntity,
  PostSearchEntity,
  PostSearchParams,
  PostUpdateParams,
  ResponseWithFetch,
} from '@server/entities';

export interface PostWriteRepository {
  /**
   * 게시글 생성
   *
   * @param params
   */
  createPost(params: PostCreateParams): ResponseWithFetch;

  /**
   * 게시글 수정
   *
   * @param params
   */
  updatePost(params: PostUpdateParams): ResponseWithFetch;

  /**
   * 게시글 삭제
   *
   * @param id
   */
  deletePost(id: number): ResponseWithFetch;

  /**
   * 게시글 이미지 업로드
   *
   * @param fd
   */
  uploadImage(fd: FormData): ResponseWithFetch<string>;
}

export interface PostDetailRepository {
  /**
   * 게시글 상세 조회
   *
   * @param id
   */
  fetchPostById(id: number): ResponseWithFetch<PostDetailResultEntityPayload>;

  /**
   * 비밀 게시글 상세 조회
   *
   * @param id
   */
  fetchPrivatePostById(
    id: number,
  ): ResponseWithFetch<PostDetailResultEntityPayload>;

  /**
   * 게시글 좋아요 추가
   *
   * @param id
   *
   * @deprecated storage 부분 service로 이관.
   */
  addLikePost(id: number): ResponseWithFetch | undefined;

  /**
   * 게시글 좋아요 여부 확인
   *
   * @deprecated service로 이관 예정
   * @param postId
   */
  checkLike(postId: number): boolean;

  /**
   * 게시글 조회 수 증가
   *
   * @param id
   */
  addPostView(id: number): ResponseWithFetch;

  /**
   * 게시글 삭제
   *
   * @param id
   */
  deletePost(id: number): ResponseWithFetch;
}

export interface PostSearchRepository {
  /**
   * 추천 게시글 조회
   *
   * @param excludeId 제외할 게시글 식별자
   * @param take 취할 개수
   */
  fetchRecommendPosts(
    excludeId: number,
    take: number,
  ): ResponseWithFetch<PostRecommendEntity[], PagingMeta>;

  /**
   * 게시글 조회
   *
   * @param params
   */
  fetchPosts(
    params: PostSearchParams,
  ): ResponseWithFetch<PostSearchEntity[], PagingMeta>;

  /**
   * 비밀 게시글 조회
   */
  fetchPrivatePosts(): ResponseWithFetch<PostPrivateSearchEntity[], PagingMeta>;

  /**
   * RSS용 피드 조회
   */
  fetchPostRss(): ResponseWithFetch<PostRssEntity[]>;
}

export interface PostRepository
  extends PostWriteRepository,
    PostSearchRepository,
    PostDetailRepository {}
