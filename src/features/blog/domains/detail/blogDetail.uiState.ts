import { AuthUserUiState } from '@features/auth/domains/auth.uiState';

export interface BlogDetailCategoryUiState {
  /**
   * 카테고리 식별자
   */
  id: number;
  /**
   * 카테고리 값
   */
  value: string;
  /**
   * 서브 카테고리 식별자
   */
  subCategoryId: number;
  /**
   * 서브 카테고리 값
   */
  subCategoryValue: string;
}

export interface BlogDetailAuthUiState extends Omit<AuthUserUiState, 'role'> {}

export interface BlogDetailTagUiState {
  id: number;
  value: string;
}

export interface BlogDetailUiState {
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
   * 게시글 생성 일자
   */
  createdAt: string;
  /**
   * 게시글 조회수
   */
  view: number;
  /**
   * 게시글 좋아요
   */
  like: number;
  /**
   * 게시글의 컨텐츠
   */
  content: string;
  /**
   * 게시글 작성 유저
   */
  user: BlogDetailAuthUiState;
  /**
   * 게시글에 연결된 태그
   */
  tags: BlogDetailTagUiState[];
  /**
   * 게시글의 비밀 여부
   */
  isPrivate: boolean;
  /**
   * 읽기 위해 예상되는 분 단위의 시간 값
   */
  readTime: string;
  /**
   * 카테고리
   *
   * 서브 카테고리의 정보가 함께있다.
   */
  category: BlogDetailCategoryUiState;
}

export interface BlogDetailNearUiState {
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
  createdAt: string;
}

export interface BlogDetailNearDto {
  /**
   * 이전 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  prev: BlogDetailNearUiState;
  /**
   * 다음 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  next: BlogDetailNearUiState;
}

export interface BlogDetailPayloadData extends BlogDetailNearDto {
  /**
   * 현재 게시글의 상세
   */
  blog: BlogDetailUiState;
}

export interface BlogDetailAnchorUiState {
  /**
   * 앵커로 활용될 h2의 id 값
   */
  id: string;
  /**
   * 앵커로 활용될 h2의 텍스트 값
   */
  value: string;
  /**
   * 앵커의 스크롤 위치
   */
  position: number;
}

export interface BlogDetailAnchorUiDto {
  /**
   * 엘리먼트의 텍스트 값
   */
  textContent: string;
  /**
   * 엘리먼트 offsetTop
   */
  offsetTop: number;
}
