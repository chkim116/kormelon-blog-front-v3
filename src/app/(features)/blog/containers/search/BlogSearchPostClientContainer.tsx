'use client';
import { useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { refineBlogPostSearchParamsModel } from '@domain/manipulates';
import { toast } from '@shared/services';
import { useQueryParser } from '@shared/hooks';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import {
  actResetCategoryName,
  effSubCategoriesLoad,
  selCurrentCategoryName,
} from '@shared/stores/category';
import {
  effBlogPostsLoad,
  selBlogPostLoading,
  selBlogPosts,
} from '@app/blog/stores';
import { BlogSearchLandingContent } from '@app/blog/components/search';
import { BlogCommonCardGrid } from '@app/blog/components/common';

export function BlogSearchPostClientContainer() {
  const params = useQueryParser(refineBlogPostSearchParamsModel);

  const dispatch = useAppDispatch();
  const posts = useAppSelector(selBlogPosts);
  const loading = useAppSelector(selBlogPostLoading);
  const currentCategoryName = useAppSelector(selCurrentCategoryName);

  useEffect(() => {
    if (!params.categoryId) {
      dispatch(actResetCategoryName());

      return;
    }

    dispatch(effSubCategoriesLoad(params.categoryId))
      .unwrap()
      .catch((err) => toast.open('error', err.message));
  }, [dispatch, params.categoryId]);

  useDeepCompareEffect(() => {
    dispatch(effBlogPostsLoad(params))
      .unwrap()
      .catch((err) => {
        toast.open('error', err.message);
      });
  }, [params, dispatch]);

  return (
    <>
      <BlogSearchLandingContent categoryName={currentCategoryName} />
      <BlogCommonCardGrid title="All Post" loading={loading} posts={posts} />
    </>
  );
}
