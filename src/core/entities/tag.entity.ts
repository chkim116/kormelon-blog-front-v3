import { PostTagEntity } from './post.entity';

export interface TagEntity extends PostTagEntity {}

export interface TagMetaEntity {
  /**
   * 조회된 태그의 개수
   */
  total: number;
}
