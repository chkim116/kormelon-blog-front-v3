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

export interface PostTagEntity {
  /**
   * 태그 식별자
   */
  id: number;
  /**
   * 태그 값
   */
  value: string;
}

export interface PostCommentEntity {
  /**
   * 댓글 식별자
   */
  id: string;
}

export interface PostSearchEntity {
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
  createdAt: Date;
}

export interface PostPrivateSearchEntity extends PostSearchEntity {
  /**
   * 비밀 모드
   */
  isPrivate: boolean;
}

export interface PostRecommendEntity extends PostSearchEntity {}

export interface PostCreateParams {
  /**
   * 유저 식별자
   */
  userId: string;
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

interface PostAuthEntity {
  /**
   * 유저 식별자
   */
  id: string;
  /**
   * 유저 프로필
   */
  profileImage: string;
  /**
   * 유저 닉네임
   */
  username: string;
}

export interface PostDetailEntity extends PostSearchEntity {
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
  category: PostCategoryEntity | null;
  /**
   * 게시글 서브 카테고리
   */
  subCategory: PostCategoryEntity | null;
  /**
   * 게시글의 컨텐츠
   */
  content: string;
  /**
   * 게시글 작성 유저
   */
  user: PostAuthEntity | null;
  /**
   * 게시글에 연결된 태그
   */
  tags: PostTagEntity[] | null;
  /**
   * 게시글의 비밀 여부
   */
  isPrivate: boolean;
}

export interface PostRssEntity {
  /**
   * 게시글 식별자
   */
  id: number;
  /**
   * 게시글 제목
   */
  title: string;
  /**
   * 게시글 내용
   */
  content: string;
  /**
   * 게시글 생성 일자
   */
  createdAt: Date;
}

export interface PostDetailNearPostEntity {
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
   * 게시글 생성 일자
   */
  createdAt: Date;
}

export interface PostDetailNearEntity {
  /**
   * 이전 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  prev: PostDetailNearPostEntity | null;
  /**
   * 다음 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  next: PostDetailNearPostEntity | null;
}

export interface PostDetailResultEntityPayload extends PostDetailNearEntity {
  /**
   * 현재 게시글의 상세
   */
  post: PostDetailEntity;
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
   * 상위 카테고리 식별자
   */
  categoryId?: number;
  /**
   * 서브 카테고리 식별자
   */
  subCategoryId?: number;
}

export interface PostSearchByTagParams {
  /**
   * 태그의 아이디
   */
  tagId: number;
}
