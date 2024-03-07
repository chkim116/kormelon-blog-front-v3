import { CategoryEntity, SubCategoryEntity } from '@core/entities';
import { HttpError } from '@core/lib/network/HttpError';
import {
  createMockFunctionWithRejectedValue,
  createMockFunctionWithResolvedValue,
} from '@fixtures/tests';
import { CategoryRepository } from '@core/repositories/category.repo.type';
import {
  toCategorySearchUiStates,
  toSubCategorySearchUiStates,
} from '../category.convert';
import { CategoryServiceImpl } from '../category.service';

const categoryRepositoryMock: CategoryRepository = {
  fetchCategories: jest.fn(),
  fetchSubCategories: jest.fn(),
  createCategory: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn(),
  createSubCategory: jest.fn(),
  updateSubCategory: jest.fn(),
  deleteSubCategory: jest.fn(),
};

const categoryService = new CategoryServiceImpl(categoryRepositoryMock);

describe('categoryService 성공 케이스', () => {
  beforeEach(() => {
    categoryService.destroyCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('카테고리 불러옴', async () => {
    const response: CategoryEntity[] = [
      {
        id: 1,
        value: '카테고리',
        post: [{ id: 1 }, { id: 2 }, { id: 3 }],
        subCategory: [],
        ordering: 1,
      },
    ];
    categoryRepositoryMock.fetchCategories =
      createMockFunctionWithResolvedValue(response);
    const result = await categoryService.fetchCategories();

    expect(categoryRepositoryMock.fetchCategories).toHaveBeenCalled();
    expect(result).toEqual(toCategorySearchUiStates(response));
  });

  it('카테고리 값이 있다면 해당 값은 캐싱', async () => {
    const response: CategoryEntity[] = [
      {
        id: 1,
        value: '카테고리',
        post: [{ id: 1 }, { id: 2 }, { id: 3 }],
        subCategory: [],
        ordering: 1,
      },
    ];
    categoryRepositoryMock.fetchCategories =
      createMockFunctionWithResolvedValue(response);

    let result = await categoryService.fetchCategories();
    result = await categoryService.fetchCategories();

    expect(categoryRepositoryMock.fetchCategories).toHaveBeenCalledTimes(1);
    expect(result).toEqual(toCategorySearchUiStates(response));
  });

  it('서브 카테고리 불러옴', async () => {
    const response: SubCategoryEntity[] = [
      {
        id: 1,
        value: '서브카테고리',
        post: [{ id: 1 }, { id: 2 }, { id: 3 }],
        category: { id: 1, value: '카테고리', ordering: 1 },
        ordering: 1,
      },
    ];
    categoryRepositoryMock.fetchSubCategories =
      createMockFunctionWithResolvedValue(response);

    const categoryId = 1;
    const result = await categoryService.fetchSubCategories(categoryId);

    expect(categoryRepositoryMock.fetchSubCategories).toHaveBeenCalledWith(
      categoryId,
    );
    expect(result).toEqual(toSubCategorySearchUiStates(response));
  });

  it('카테고리 생성 후 카테고리 캐시 제거 후 재갱신', async () => {
    categoryRepositoryMock.createCategory = jest.fn();
    const prevResponse: CategoryEntity[] = [
      {
        id: 1,
        value: '카테고리',
        post: [{ id: 1 }, { id: 2 }, { id: 3 }],
        subCategory: [],
        ordering: 1,
      },
    ];
    const nextResponse: CategoryEntity[] = [
      ...prevResponse,
      {
        id: 2,
        value: '카테고리2',
        post: [{ id: 1 }, { id: 2 }, { id: 3 }],
        subCategory: [],
        ordering: 1,
      },
    ];
    categoryRepositoryMock.fetchCategories = jest
      .fn()
      // 최초
      .mockResolvedValueOnce({ payload: prevResponse })
      // 생성 후
      .mockResolvedValueOnce({ payload: nextResponse });

    await categoryService.fetchCategories();
    const result = await categoryService.createCategory({ value: '카테고리2' });

    expect(categoryRepositoryMock.fetchCategories).toHaveBeenCalledTimes(2);
    expect(result).toEqual(toCategorySearchUiStates(nextResponse));
  });
});

describe('categoryService 실패 케이스', () => {
  beforeEach(() => {
    categoryService.destroyCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('카테고리 호출 실패.', async () => {
    categoryRepositoryMock.fetchCategories =
      createMockFunctionWithRejectedValue(new HttpError());

    await expect(() => categoryService.fetchCategories()).rejects.toMatchObject(
      {
        message: '알 수 없는 서버 오류입니다.',
      },
    );
  });

  it('서브 카테고리 호출 실패.', async () => {
    categoryRepositoryMock.fetchSubCategories =
      createMockFunctionWithRejectedValue(new HttpError());

    await expect(() =>
      categoryService.fetchSubCategories(1),
    ).rejects.toMatchObject({
      message: '알 수 없는 서버 오류입니다.',
    });
  });
});
