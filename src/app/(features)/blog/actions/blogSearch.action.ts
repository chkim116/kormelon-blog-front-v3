'use server';
import 'server-only';

import { toString } from 'safers';
import { blogSearchService } from '@domain/blog/search';
import { ActionFnType } from '@shared/uiStates/sharedActions.uiState';
import { BlogSearchPreloadData } from '@domain/blog/search/blogSearch.uiState';
import {
  createActionRejectedWithError,
  createActionResolveWithData,
} from '@shared/manipulates/sharedActions.create';
import { categoryService } from '@domain/category';

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
