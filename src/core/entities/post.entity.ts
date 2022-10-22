import { UserEntity } from './auth.entity';

export interface BlogPostCategoryEntity {
  /**
   * 카테고리 식별자
   */
  id: number;
  /**
   * 카테고리 값
   */
  value: string;
}

export interface BlogPostTagEntity {
  id: number;
  value: string;
}

export interface BlogPostCommentEntity {
  /**
   * 댓글 식별자
   */
  id: string;
}

export interface BlogPostEntity {
  /**
   * 게시글 식별자
   */
  id: number;
  /**
   * 게시글 제목
   */
  title: string;
  /**
   * 게시글 썸네일
   */
  thumbnail: string;
  /**
   * 게시글 미리 보기 내용
   */
  preview: string;
  /**
   * 게시글 예상 조회 시간
   */
  readTime: number;
  /**
   * 게시글 생성 일자
   */
  createdAt: string;
}

export interface BlogPostRecommendEntity extends BlogPostEntity {}

export interface BlogPostCreateParams {
  /**
   * 게시글의 미리보기 내용
   */
  preview: string;
  /**
   * 게시글의 썸네일
   */
  thumbnail: string;
  /**
   * 게시글 제목
   */
  title: string;
  /**
   * 게시글 컨텐츠
   */
  content: string;
  /**
   * 게시글에 연결할 태그 id 목록
   */
  tags: number[];
  /**
   * 게시글이 등록될 카테고리
   */
  categoryId: number;
  /**
   * 게시글이 등록될 서브 카테고리
   */
  subCategoryId: number;
  /**
   * 비밀 여부
   */
  isPrivate: boolean;
}

export interface BlogPostUpdateParams extends BlogPostCreateParams {
  /**
   * 게시글의 식별자
   */
  id: number;
}

export interface BlogPostDetailEntity extends BlogPostEntity {
  /**
   * 게시글 조회수
   */
  view: number;
  /**
   * 게시글 좋아요
   */
  like: number;
  /**
   * 게시글 카테고리
   */
  category: BlogPostCategoryEntity;
  /**
   * 게시글 서브 카테고리
   */
  subCategory: BlogPostCategoryEntity;
  /**
   * 게시글의 컨텐츠
   */
  content: string;
  /**
   * 게시글 작성 유저
   */
  user: Omit<UserEntity, 'role'>;
  /**
   * 게시글에 연결된 태그
   */
  tags: BlogPostTagEntity[];
  /**
   * 게시글의 비밀 여부
   */
  isPrivate: boolean;
}

export type BlogPostDetailNearPost = Omit<
  BlogPostEntity,
  'preview' | 'readTime'
> | null;

export interface BlogPostNearEntity {
  prev: BlogPostDetailNearPost;
  next: BlogPostDetailNearPost;
}

export interface BlogPostDetailResultEntityPayload {
  /**
   * 현재 게시글의 상세
   */
  post: BlogPostDetailEntity;
  /**
   * 이전 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  prev: BlogPostDetailNearPost;
  /**
   * 다음 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  next: BlogPostDetailNearPost;
}

export interface BlogPostSearchParams {
  /**
   * 페이지
   *
   * @default 1
   */
  page?: number;
  /**
   * 페이지 당 게시글 개수
   *
   * @default 10
   */
  per?: number;
  /**
   * 제목 or 컨텐츠 검색 파라미터
   */
  keyword?: string;
  /**
   * 카테고리 별로 불러올 수 있는 쿼리
   */
  subCategoryId?: number;
  /**
   * 상위 카테고리 쿼리
   *
   * 실제 서버 검색에는 사용하지 않는다.
   */
  categoryId?: number;
}
