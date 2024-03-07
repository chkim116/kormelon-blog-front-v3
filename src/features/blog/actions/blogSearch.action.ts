'use server';
import 'server-only';

import { toString } from 'safers';
import { createSafeAction } from '@common/lib/createSafeAction';
import { CreateSafeAction } from '@common/lib/createSafeAction.uiState';
import { blogSearchService } from '@features/blog/domains/search';
import {
  BlogPrivateSearchPayloadData,
  BlogSearchPreloadData,
} from '@features/blog/domains/search/blogSearch.uiState';
import { categoryService } from '@features/categories/domains';
import { createBlogSearchUiParams } from '../domains/search/blogSearch.create';

export const actBlogSearchLoad: CreateSafeAction<
  Record<string, string>,
  BlogSearchPreloadData
> = createSafeAction(
  async (pageParams) => {
    const params = blogSearchService.refineQueryParams(pageParams);
    const blogData = await blogSearchService.fetchBlogs(params);
    const categories = await categoryService.fetchCategories();

    const currentCategory = categories.find(
      ({ id }) => id === params.categoryId,
    );

    const currentCategoryName = toString(currentCategory?.value);
    const currentSubCategoryName = toString(
      currentCategory?.subCategories.find(
        ({ id }) => id === params.subCategoryId,
      )?.value,
    );

    return {
      params,
      blogData,
      currentCategoryName,
      currentSubCategoryName,
    };
  },
  {
    params: createBlogSearchUiParams(),
    blogData: {
      blogs: [],
      total: 0,
      totalPage: 0,
    },
    currentCategoryName: '',
    currentSubCategoryName: '',
  },
);

export const actBlogPrivateSearchLoad: CreateSafeAction<
  void,
  BlogPrivateSearchPayloadData
> = createSafeAction(
  async () => {
    const blogData = await blogSearchService.fetchPrivateBlogs();

    return blogData;
  },
  {
    blogs: [],
    total: 0,
    totalPage: 0,
  },
);
