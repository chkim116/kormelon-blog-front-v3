import {
  PostDetailEntity,
  PostDetailNearPost,
  PostEntity,
} from '@core/entities';

export interface PostModel extends Omit<PostEntity, 'readTime'> {
  /**
   * 읽기 위해 예상되는 분 단위의 시간 값
   */
  readTime: string;
}

export interface PostSearchResultPayload {
  posts: PostModel[];
  total: number;
}

export interface PostCategoryModel {
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

export interface PostDetailModel
  extends Omit<PostDetailEntity, 'readTime' | 'category' | 'subCategory'> {
  /**
   * 읽기 위해 예상되는 분 단위의 시간 값
   */
  readTime: string;
  /**
   * 카테고리
   *
   * 서브 카테고리의 정보가 함께있다.
   */
  category: PostCategoryModel;
}

export interface PostDetailResultPayload {
  /**
   * 현재 게시글의 상세
   */
  post: PostDetailModel;
  /**
   * 이전 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  prev: PostDetailNearPost;
  /**
   * 다음 게시글
   *
   * 기준은 카테고리 기준 다음 글이다.
   */
  next: PostDetailNearPost;
}

export interface AnchorModel {
  /**
   * 앵커로 활용될 h1의 id 값
   */
  id: string;
  /**
   * 앵커로 활용될 h1의 텍스트 값
   */
  value: string;
}
