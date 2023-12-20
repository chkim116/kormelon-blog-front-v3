import {
  CategoryEntity,
  SubCategoryEntity,
  CategoryCreateParams,
  SubCategoryCreateParams,
  CategoryUpdateParams,
  SubCategoryUpdateParams,
  ResponseWithFetch,
} from '@shared/entities';

export interface CategoryRepository {
  /**
   * 카테고리들을 조회한다.
   *
   * 해당 API는 모든 서브 카테고리도 따라온다.
   *
   * @returns
   */
  fetchCategories(): ResponseWithFetch<CategoryEntity[]>;

  /**
   * 해당 카테고리의 서브 카테고리를 조회한다.
   *
   * @returns
   */
  fetchSubCategories(
    categoryId: number,
  ): ResponseWithFetch<SubCategoryEntity[]>;

  /**
   * 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  createCategory(params: CategoryCreateParams): ResponseWithFetch;

  /**
   * 서브 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  createSubCategory(params: SubCategoryCreateParams): ResponseWithFetch;

  /**
   * 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  updateCategory(params: CategoryUpdateParams): ResponseWithFetch;

  /**
   * 서브 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  updateSubCategory(params: SubCategoryUpdateParams): ResponseWithFetch;

  /**
   * 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  deleteCategory(id: number): ResponseWithFetch<void>;

  /**
   * 서브 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  deleteSubCategory(id: number): ResponseWithFetch<void>;
}
