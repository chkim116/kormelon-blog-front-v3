import { TagSearchUiState } from '@domain/tag/tag.uiState';

export interface BlogWriteUiParams {
  /**
   * 수정할 게시글 식별자
   *
   * 0이라면 해당 없음
   */
  editId: number;
  /**
   * 게시글 비밀 모드 여부
   */
  isPrivateMode: boolean;
}

export interface BlogWriteCreateUiParams {
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
  tags: TagSearchUiState[];
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

export interface BlogWriteUpdateUiParams extends BlogWriteCreateUiParams {
  /**
   * 게시글의 식별자
   */
  id: number;
}
