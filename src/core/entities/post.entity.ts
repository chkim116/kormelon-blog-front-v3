import { UserEntity } from './auth.entity';

export interface PostCategoryEntity {
  /**
   * 카테고리 식별자
   */
  id: number;
  /**
   * 카테고리 값
   */
  value: string;
}

export interface PostTag {
  id: number;
  value: string;
}

export interface PostCommentEntity {
  /**
   * 댓글 식별자
   */
  id: string;
}

export interface PostEntity {
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

export interface PostRecommendEntity extends PostEntity {}

export interface PostCreateParams {
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

export interface PostUpdateParams extends PostCreateParams {
  /**
   * 게시글의 식별자
   */
  id: number;
}

export interface PostDetailEntity extends PostEntity {
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
  category: PostCategoryEntity;
  /**
   * 게시글 서브 카테고리
   */
  subCategory: PostCategoryEntity;
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
  tags: PostTag[];
  /**
   * 게시글의 비밀 여부
   */
  isPrivate: boolean;
}

export type PostDetailNearPost = Omit<
  PostEntity,
  'preview' | 'readTime'
> | null;

export interface PostNearEntity {
  prev: PostDetailNearPost;
  next: PostDetailNearPost;
}

export interface PostDetailResultEntityPayload {
  /**
   * 현재 게시글의 상세
   */
  post: PostDetailEntity;
  /**
   * 이전 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  prev: PostDetailNearPost;
  /**
   * 다음 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  next: PostDetailNearPost;
}

export interface PostSearchParams {
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
