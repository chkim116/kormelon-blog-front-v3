interface BaseCategoryEntity {
  /**
   * 카테고리 식별자
   */
  id: number;
  /**
   * 카테고리 값
   */
  value: string;
  /**
   * 우선 순위
   */
  ordering: number;
}

interface CategoryInPostEntity {
  id: number;
}

export interface SubCategoryEntity extends BaseCategoryEntity {
  /**
   * 부모 카테고리 정보
   */
  category: BaseCategoryEntity;
  /**
   * 서브 카테고리에 해당하는 게시글 식별자 배열 개수
   */
  post: CategoryInPostEntity[];
}

export interface CategorySubCategoryEntity extends BaseCategoryEntity {
  /**
   * 부모 카테고리 정보
   */
  category: BaseCategoryEntity;
}

export interface CategoryEntity extends BaseCategoryEntity {
  /**
   * 카테고리 식별자
   */
  id: number;
  /**
   * 카테고리 값
   */
  value: string;
  /**
   * 카테고리에 해당하는 게시글 식별자 목록
   */
  post: CategoryInPostEntity[];
  /**
   * 해당 카테고리의 서브 카테고리
   */
  subCategory: CategorySubCategoryEntity[];
}

export interface CategoryCreateParams {
  /**
   * 생성하고자 하는 카테고리 값
   */
  value: string;
}

export interface CategoryUpdateParams extends CategoryCreateParams {
  /**
   * 자신의 식별자
   */
  categoryId: number;
}

export interface SubCategoryCreateParams extends CategoryCreateParams {
  /**
   * 자신이 속한 부모 카테고리의 식별자
   */
  categoryId: number;
}

export interface SubCategoryUpdateParams extends CategoryCreateParams {
  /**
   * 자신의 식별자
   */
  id: number;
}
