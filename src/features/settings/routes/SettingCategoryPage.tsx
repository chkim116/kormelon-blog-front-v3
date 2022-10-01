import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@common/store';
import { SettingCategoryCreatorContainer } from '../containers/SettingCategoryCreatorContainer';
import { SettingCategoryListContainer } from '../containers/SettingCategoryListContainer';
import {
  effCategoriesLoad,
  selCategories,
  selCategoryLoading,
} from '../stores';

export const SettingCategoryPage = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selCategoryLoading);
  const categories = useAppSelector(selCategories);

  const loadCategories = useCallback(() => {
    dispatch(effCategoriesLoad());
  }, [dispatch]);

  useEffect(loadCategories, [loadCategories]);

  return (
    <>
      <SettingCategoryCreatorContainer isLoading={isLoading} />
      <SettingCategoryListContainer categories={categories} />
    </>
  );
};
