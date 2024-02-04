import {
  CategoryCreateParams,
  CategoryEntity,
  CategoryUpdateParams,
  SubCategoryCreateParams,
  SubCategoryEntity,
  SubCategoryUpdateParams,
} from '@core/entities';
import prisma from '@core/lib/prisma';
import { prismaResolveHandler } from '@core/network/payloadHandler';
import { CategoryRepository } from './category.repo.type';

export class CategoryRepositoryImpl implements CategoryRepository {
  /**
   * 카테고리들을 조회한다.
   *
   * 해당 API는 모든 서브 카테고리도 따라온다.
   *
   * @returns
   */
  async fetchCategories() {
    const entities: CategoryEntity[] = await prisma.category.findMany({
      select: {
        id: true,
        value: true,
        ordering: true,
        subCategory: {
          select: {
            id: true,
            value: true,
            ordering: true,
            category: {
              select: {
                id: true,
                value: true,
                ordering: true,
              },
            },
          },
          orderBy: {
            ordering: 'asc',
          },
        },
        post: {
          where: {
            isPrivate: false,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        ordering: 'asc',
      },
    });

    return prismaResolveHandler(entities);
  }

  /**
   * 해당 카테고리의 서브 카테고리를 조회한다.
   *
   * @returns
   */
  async fetchSubCategories(categoryId: number) {
    const entities: SubCategoryEntity[] = await prisma.subCategory.findMany({
      where: {
        categoryId,
      },
      select: {
        id: true,
        value: true,
        ordering: true,
        category: {
          select: {
            id: true,
            value: true,
            ordering: true,
          },
        },
        post: {
          where: {
            isPrivate: false,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        ordering: 'asc',
      },
    });

    return prismaResolveHandler(entities);
  }

  /**
   * 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  async createCategory(params: CategoryCreateParams) {
    await prisma.category.create({
      data: {
        value: params.value,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 서브 카테고리를 생성한다.
   *
   * @param params
   * @returns
   */
  async createSubCategory(params: SubCategoryCreateParams) {
    await prisma.subCategory.create({
      data: {
        value: params.value,
        categoryId: params.categoryId,
      },
    });
    return prismaResolveHandler();
  }

  /**
   * 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  async updateCategory(params: CategoryUpdateParams) {
    await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        value: params.value,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 서브 카테고리를 업데이트한다.
   *
   * @param params
   * @returns
   */
  async updateSubCategory(params: SubCategoryUpdateParams) {
    await prisma.subCategory.update({
      where: {
        id: params.id,
      },
      data: {
        value: params.value,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  async deleteCategory(id: number) {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    return prismaResolveHandler();
  }

  /**
   * 서브 카테고리를 삭제한다.
   *
   * @param id
   * @returns
   */
  async deleteSubCategory(id: number) {
    await prisma.subCategory.delete({
      where: {
        id,
      },
    });

    return prismaResolveHandler();
  }
}

export const categoryRepository = new CategoryRepositoryImpl();
