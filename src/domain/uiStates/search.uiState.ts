import { BlogPostModel } from './blog.uiState';

export interface SearchPostModel extends BlogPostModel {}

export interface SearchPostResultPayload {
  posts: SearchPostModel[];
  total: number;
  totalPage: number;
}
