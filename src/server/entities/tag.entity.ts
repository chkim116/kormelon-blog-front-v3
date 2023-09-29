import { BlogPostTagEntity } from './post.entity';

export interface TagEntity extends BlogPostTagEntity {}

export interface TagWithPostEntity extends BlogPostTagEntity {
  /**
   * 태그와 연관된 게시글 아이디
   */
  posts: Record<'id', number>[];
}

export interface TagMetaEntity {
  /**
   * 조회된 태그의 개수
   */
  total: number;
}
