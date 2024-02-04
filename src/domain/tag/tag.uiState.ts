import { BlogSearchUiState } from '@domain/blog/search/blogSearch.uiState';

export interface TagSearchUiState {
  /**
   * 태그 식별자
   */
  id: number;
  /**
   *  태그 값
   */
  value: string;
}

export interface TagSearchWithPostCountUiState extends TagSearchUiState {
  /**
   * 태그에 연관된 게시글
   *
   * 게시글 식별자로 이뤄진 배열이다.
   */
  posts: number[];
}

export interface TagWithBlogsSearchUiParams {
  tagId: number;
  tagValue: string;
}

export interface TagSearchPayloadData {
  tags: TagSearchWithPostCountUiState[];
  total: number;
}

export interface TagWithBlogsSearchPayloadData {
  blogs: BlogSearchUiState[];
  total: number;
}
