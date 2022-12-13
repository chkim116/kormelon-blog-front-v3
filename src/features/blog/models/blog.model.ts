import { BlogPostEntity } from '@core/entities';

export interface BlogPostModel extends Omit<BlogPostEntity, 'readTime'> {
  /**
   * 읽기 위해 예상되는 분 단위의 시간 값
   */
  readTime: string;
}

export interface BlogPostSearchResultPayload {
  posts: BlogPostModel[];
  total: number;
}

export interface BlogPostCategoryModel {
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
