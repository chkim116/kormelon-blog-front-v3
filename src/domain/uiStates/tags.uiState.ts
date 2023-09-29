import { TagEntity } from '@server/entities';

export interface TagModel extends TagEntity {}

export interface TagWithPostModel extends TagEntity {
  /**
   * 태그에 연관된 게시글
   */
  posts: number[];
}

export interface TagSearchResultPayload {
  tags: TagWithPostModel[];
  total: number;
}
