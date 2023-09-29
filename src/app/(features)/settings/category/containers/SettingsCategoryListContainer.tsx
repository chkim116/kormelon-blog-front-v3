'use client';
/* eslint-disable indent */
import { useCallback, useEffect } from 'react';
import {
  CategoryUpdateParams,
  SubCategoryUpdateParams,
} from '@server/entities';
import { toast } from '@shared/services';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import {
  effCategoriesDelete,
  effCategoriesLoad,
  effCategoriesUpdate,
  effSubCategoriesCreate,
  effSubCategoriesDelete,
  effSubCategoriesUpdate,
  selCategories,
  selCategoryLoading,
} from '@shared/stores/category';
import { SettingsCategoryCategoryList } from '../components';
import { SettingsSubCategoryCreateArgs } from '../components/SettingsCategoryCategoryItem';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsCategoryListContainerProps {}

export const SettingsCategoryListContainer = (
  _: SettingsCategoryListContainerProps,
) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selCategoryLoading);
  const categories = useAppSelector(selCategories);

  const handleCategoryDeleteClick = (id: number) => {
    if (window.confirm('해당 카테고리를 삭제합니까?')) {
      dispatch(effCategoriesDelete(id))
        .unwrap()
        .then(() => toast.open('success', '삭제 완료'))
        .catch((err) => toast.open('error', err.message));
    }
  };

  const handleSubDeleteClick = (id: number) => {
    if (window.confirm('해당 카테고리를 삭제합니까?')) {
      dispatch(effSubCategoriesDelete(id))
        .unwrap()
        .then(() => toast.open('success', '삭제 완료'))
        .catch((err) => toast.open('error', err.message));
    }
  };

  const handleCategoryUpdateClick = (params: CategoryUpdateParams) => {
    if (window.confirm('해당 카테고리를 수정합니까?')) {
      dispatch(effCategoriesUpdate(params))
        .unwrap()
        .then(() => toast.open('success', '수정 완료'))
        .catch((err) => toast.open('error', err.message));
    }
  };

  const handleSubUpdateClick = (params: SubCategoryUpdateParams) => {
    if (window.confirm('해당 카테고리를 수정합니까?')) {
      dispatch(effSubCategoriesUpdate(params))
        .unwrap()
        .then(() => toast.open('success', '수정 완료'))
        .catch((err) => toast.open('error', err.message));
    }
  };

  const handleSubCreateClick = ({
    id,
    value,
  }: SettingsSubCategoryCreateArgs) => {
    dispatch(effSubCategoriesCreate({ categoryId: id, value }))
      .unwrap()
      .then(() => toast.open('success', `서브 카테고리 ${value} 생성 완료`))
      .catch((err) => toast.open('error', err.message));
  };

  const loadCategories = useCallback(() => {
    dispatch(effCategoriesLoad());
  }, [dispatch]);

  useEffect(loadCategories, [loadCategories]);

  return (
    <SettingsCategoryCategoryList
      loading={isLoading}
      categories={categories}
      onCategoryDeleteClick={handleCategoryDeleteClick}
      onCategoryUpdateClick={handleCategoryUpdateClick}
      onSubCreateClick={handleSubCreateClick}
      onSubUpdateClick={handleSubUpdateClick}
      onSubDeleteClick={handleSubDeleteClick}
    />
  );
};
