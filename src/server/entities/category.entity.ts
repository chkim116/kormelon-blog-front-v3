interface BaseCategoryEntity {
  /**
   * 카테고리 식별자
   */
  id: number;
  /**
   * 카테고리 값
   */
  value: string;
}

export interface SubCategoryEntity extends BaseCategoryEntity {
  /**
   * 부모 카테고리 정보
   */
  category: BaseCategoryEntity;
  /**
   * 서브 카테고리에 해당하는 게시글 개수
   */
  posts: number;
}

export interface CategoryEntity extends BaseCategoryEntity {
  /**
   * 카테고리에 해당하는 게시글 개수
   */
  posts: number;
  /**
   * 해당 카테고리의 서브 카테고리
   */
  subCategories: Omit<SubCategoryEntity, 'posts'>[];
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

export interface SubCategoryUpdateParams
  extends Omit<CategoryUpdateParams, 'categoryId'> {
  /**
   * 자신의 식별자
   */
  id: number;
}
