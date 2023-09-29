import { BlogPostEntity } from '@server/entities';
import { SubCategoryModel } from './category.uiState';

export interface BlogPostSearchParamsModel {
  page: number;
  per: number;
  keyword: string;
  categoryId: number;
  subCategoryId: number;
}

export interface BlogPostModel extends Omit<BlogPostEntity, 'readTime'> {
  /**
   * 읽기 위해 예상되는 분 단위의 시간 값
   */
  readTime: string;
}

export interface BlogPrivatePostModel extends BlogPostModel {
  /**
   * 비밀 모드
   */
  isPrivate: boolean;
}

export interface BlogPostSearchResultPayload {
  posts: BlogPostModel[];
  total: number;
  totalPage: number;
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

export type BlogPostSubCategoryModel = Omit<SubCategoryModel, 'posts'>;
