import { PostTagEntity } from './post.entity';

export interface TagSearchEntity extends PostTagEntity {}

export interface TagSearchWithPostEntity extends PostTagEntity {
  /**
   * 태그와 연관된 게시글 아이디
   */
  posts: Record<'id', number>[];
}

export interface TagSearchMetaEntity {
  /**
   * 조회된 태그의 개수
   */
  total: number;
}
