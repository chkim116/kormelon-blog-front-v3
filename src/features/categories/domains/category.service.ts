import { CategoryRepository } from '@core/repositories/category.repo.type';
import {
  CategoryCreateUiParams,
  CategorySearchUiState,
  CategoryUpdateUiParams,
  SubCategoryCreateUiParams,
  SubCategorySearchUiState,
  SubCategoryUpdateUiParams,
} from './category.uiState';
import {
  toCategorySearchUiStates,
  toSubCategorySearchUiStates,
} from './category.convert';

export interface CategoryService {
  /**
   * 카테고리 목록 호출
   */
  fetchCategories(): Promise<CategorySearchUiState[]>;
  /**
   * 서브 카테고리 목록 호출
   */
  fetchSubCategories(id: number): Promise<SubCategorySearchUiState[]>;

  /**
   * 카테고리 생성
   */
  createCategory(
    params: CategoryCreateUiParams,
  ): Promise<CategorySearchUiState[]>;
  /**
   * 카테고리 수정
   */
  updateCategory(
    params: CategoryUpdateUiParams,
  ): Promise<CategorySearchUiState[]>;
  /**
   * 카테고리 삭제
   */
  deleteCategory(id: number): Promise<CategorySearchUiState[]>;

  /**
   * 서브 카테고리 생성
   */
  createSubCategory(
    params: SubCategoryCreateUiParams,
  ): Promise<CategorySearchUiState[]>;
  /**
   * 서브 카테고리 수정
   */
  updateSubCategory(
    params: SubCategoryUpdateUiParams,
  ): Promise<CategorySearchUiState[]>;

  /**
   * 서브 카테고리 삭제
   */
  deleteSubCategory(id: number): Promise<CategorySearchUiState[]>;

  /**
   * 캐싱된 카테고리 값 제거
   */
  destroyCache(): void;
}

export class CategoryServiceImpl implements CategoryService {
  private categories: CategorySearchUiState[] = [];

  constructor(private categoryRepo: CategoryRepository) {}

  async fetchCategories(): Promise<CategorySearchUiState[]> {
    if (this.categories.length) {
      return this.categories;
    }

    const { payload } = await this.categoryRepo.fetchCategories();

    const categories = toCategorySearchUiStates(payload);
    this.categories = categories;

    return categories;
  }

  async fetchSubCategories(
    categoryId: number,
  ): Promise<SubCategorySearchUiState[]> {
    const { payload } = await this.categoryRepo.fetchSubCategories(categoryId);

    return toSubCategorySearchUiStates(payload);
  }

  async createCategory(
    params: CategoryCreateUiParams,
  ): Promise<CategorySearchUiState[]> {
    await this.categoryRepo.createCategory(params);

    return this.refresh();
  }

  async updateCategory(
    params: CategoryUpdateUiParams,
  ): Promise<CategorySearchUiState[]> {
    await this.categoryRepo.updateCategory(params);

    return this.refresh();
  }

  async deleteCategory(id: number): Promise<CategorySearchUiState[]> {
    await this.categoryRepo.deleteCategory(id);
    return this.refresh();
  }

  async createSubCategory(
    params: SubCategoryCreateUiParams,
  ): Promise<CategorySearchUiState[]> {
    await this.categoryRepo.createSubCategory(params);

    return this.refresh();
  }

  async updateSubCategory(
    params: SubCategoryUpdateUiParams,
  ): Promise<CategorySearchUiState[]> {
    await this.categoryRepo.updateSubCategory(params);

    return this.refresh();
  }

  async deleteSubCategory(id: number): Promise<CategorySearchUiState[]> {
    await this.categoryRepo.deleteSubCategory(id);
    return this.refresh();
  }

  destroyCache() {
    this.categories = [];
  }

  private async refresh() {
    this.destroyCache();

    await this.fetchCategories();

    return this.categories;
  }
}
