import {
  SubCategoryEntity,
  CategoryCreateParams,
  SubCategoryCreateParams,
  CategoryUpdateParams,
  SubCategoryUpdateParams,
  PromisePrismaResolveResponse,
  CategoryEntity,
} from '@core/entities';

export interface CategoryRepository {
  /**
   * 카테고리들을 조회한다.
   *
   * 해당 API는 모든 서브 카테고리도 따라온다.
   *
   * @returns
   */
  fetchCategories(): PromisePrismaResolveResponse<CategoryEntity[]>;

  /**
   * 해당 카테고리의 서브 카테고리를 조회한다.
   *
   * @returns
   */
  fetchSubCategories(
    categoryId: number,
  ): PromisePrismaResolveResponse<SubCategoryEntity[]>;

  /**
   * 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  createCategory(params: CategoryCreateParams): PromisePrismaResolveResponse;

  /**
   * 서브 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  createSubCategory(
    params: SubCategoryCreateParams,
  ): PromisePrismaResolveResponse;

  /**
   * 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  updateCategory(params: CategoryUpdateParams): PromisePrismaResolveResponse;

  /**
   * 서브 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  updateSubCategory(
    params: SubCategoryUpdateParams,
  ): PromisePrismaResolveResponse;

  /**
   * 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  deleteCategory(id: number): PromisePrismaResolveResponse;

  /**
   * 서브 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  deleteSubCategory(id: number): PromisePrismaResolveResponse;
}
