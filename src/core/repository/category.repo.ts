import {
  CategoryCreateParams,
  CategoryEntity,
  CategoryUpdateParams,
  Response,
  SubCategoryCreateParams,
  SubCategoryEntity,
  SubCategoryUpdateParams,
} from '@core/entities';
import { apiClient } from '@core/network';

export const categoryRepository = {
  /**
   * 카테고리들을 조회한다.
   *
   * 해당 API는 모든 서브 카테고리도 따라온다.
   *
   * @returns
   */
  fetchCategories() {
    return apiClient.get<Response<CategoryEntity[]>>('/category');
  },

  /**
   * 해당 카테고리의 서브 카테고리를 조회한다.
   *
   * @returns
   */
  fetchSubCategories() {
    return apiClient.get<Response<SubCategoryEntity[]>>('/subCategory');
  },

  /**
   * 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  createCategory(params: CategoryCreateParams) {
    return apiClient.post<Response>('/category', params);
  },

  /**
   * 서브 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  createSubCategory(params: SubCategoryCreateParams) {
    return apiClient.post<Response>('/subCategory', params);
  },

  /**
   * 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  updateCategory(params: CategoryUpdateParams) {
    return apiClient.put<Response>('/category', params);
  },

  /**
   * 서브 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  updateSubCategory(params: SubCategoryUpdateParams) {
    return apiClient.put<Response>('/subCategory', params);
  },

  /**
   * 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  deleteCategory(id: number) {
    return apiClient.delete(`/category?id=${id}`);
  },

  /**
   * 서브 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  deleteSubCategory(id: number) {
    return apiClient.delete(`/subCategory?id=${id}`);
  },
};
