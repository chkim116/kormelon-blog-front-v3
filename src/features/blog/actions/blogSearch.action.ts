'use server';
import 'server-only';

import { toString } from 'safers';
import { ActionFnType } from '@shared/domains/common/sharedActions.uiState';
import {
  createActionRejectedWithError,
  createActionResolveWithData,
} from '@shared/domains/common/sharedActions.create';
import { blogSearchService } from '@features/blog/domains/search';
import { BlogSearchPreloadData } from '@features/blog/domains/search/blogSearch.uiState';
import { categoryService } from '@features/categories/domains';

export const actBlogSearchLoad: ActionFnType<
  Record<string, string>,
  BlogSearchPreloadData
> = async (pageParams) => {
  try {
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

    return createActionResolveWithData({
      params,
      blogData,
      currentCategoryName,
      currentSubCategoryName,
    });
  } catch (err) {
    return createActionRejectedWithError(err);
  }
};

export async function actBlogPrivateSearchLoad() {
  const blogData = await blogSearchService.fetchPrivateBlogs();

  return blogData;
}
