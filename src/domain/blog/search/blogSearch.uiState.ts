export interface BlogSearchUiParams {
  /**
   * 페이지 번호
   */
  page: number;
  /**
   * 페이지 개당 개수
   */
  per: number;
  /**
   * 검색 키워드
   */
  keyword: string;
  /**
   * 검색 카테고리 번호
   */
  categoryId: number;
  /**
   * 검색 서브 카테고리 번호
   */
  subCategoryId: number;
}

export interface BlogSearchUiState {
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
   * 읽기 위해 예상되는 분 단위의 시간 값
   */
  readTime: string;
}

export interface BlogSearchPrivateUiState extends BlogSearchUiState {
  /**
   * 비밀 여부
   *
   * true면 비밀글
   */
  isPrivate: boolean;
}

export interface BlogSearchPayloadData {
  blogs: BlogSearchUiState[];
  total: number;
  totalPage: number;
}

export interface BlogPrivateSearchPayloadData {
  blogs: BlogSearchPrivateUiState[];
  total: number;
  totalPage: number;
}

export interface BlogSearchPreloadData {
  params: BlogSearchUiParams;
  blogData: BlogSearchPayloadData;
  currentCategoryName: string;
  currentSubCategoryName: string;
}
