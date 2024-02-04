import {
  CategoryCreateParams,
  CategoryEntity,
  CategoryUpdateParams,
  Response,
  SubCategoryCreateParams,
  SubCategoryEntity,
  SubCategoryUpdateParams,
} from '@server/entities';
import { authApiServer, baseApiServer } from '@server/apiServer';
import { CategoryRepository } from './types';

export class CategoryRepositoryImpl implements CategoryRepository {
  /**
   * 카테고리들을 조회한다.
   *
   * 해당 API는 모든 서브 카테고리도 따라온다.
   *
   * @returns
   */
  fetchCategories() {
    return baseApiServer<Response<CategoryEntity[]>>('/category', {
      method: 'GET',
    });
  }

  /**
   * 해당 카테고리의 서브 카테고리를 조회한다.
   *
   * @returns
   */
  fetchSubCategories(categoryId: number) {
    return baseApiServer<Response<SubCategoryEntity[]>>('/subCategory', {
      method: 'GET',
      query: { categoryId },
    });
  }

  /**
   * 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  createCategory(params: CategoryCreateParams) {
    return authApiServer<Response>('/category', {
      method: 'POST',
      body: params,
    });
  }

  /**
   * 서브 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  createSubCategory(params: SubCategoryCreateParams) {
    return authApiServer<Response>('/subCategory', {
      method: 'POST',
      body: params,
    });
  }

  /**
   * 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  updateCategory(params: CategoryUpdateParams) {
    return authApiServer<Response>('/category', {
      method: 'PUT',
      body: params,
    });
  }

  /**
   * 서브 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  updateSubCategory(params: SubCategoryUpdateParams) {
    return authApiServer<Response>('/subCategory', {
      method: 'PUT',
      body: params,
    });
  }

  /**
   * 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  deleteCategory(id: number) {
    return authApiServer(`/category?id=${id}`, { method: 'DELETE' });
  }

  /**
   * 서브 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  deleteSubCategory(id: number) {
    return authApiServer(`/subCategory?id=${id}`, { method: 'DELETE' });
  }
}

export const categoryRepository = new CategoryRepositoryImpl();
