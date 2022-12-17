import { BlogPostModel } from '@features/blog/models';

export interface SearchPostModel extends BlogPostModel {}

export interface SearchPostResultPayload {
  posts: SearchPostModel[];
  total: number;
}
