import {
  BlogPostDetailEntity,
  BlogPostDetailNearPost as BlogPostDetailNearPost,
  BlogPostEntity,
} from '@core/entities';

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

export interface BlogPostDetailModel
  extends Omit<BlogPostDetailEntity, 'readTime' | 'category' | 'subCategory'> {
  /**
   * 읽기 위해 예상되는 분 단위의 시간 값
   */
  readTime: string;
  /**
   * 카테고리
   *
   * 서브 카테고리의 정보가 함께있다.
   */
  category: BlogPostCategoryModel;
}

export interface BlogPostDetailResultPayload {
  /**
   * 현재 게시글의 상세
   */
  post: BlogPostDetailModel;
  /**
   * 이전 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  prev: BlogPostDetailNearPost;
  /**
   * 다음 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  next: BlogPostDetailNearPost;
}

export interface BlogPostAnchorModel {
  /**
   * 앵커로 활용될 h1의 id 값
   */
  id: string;
  /**
   * 앵커로 활용될 h1의 텍스트 값
   */
  value: string;
}
