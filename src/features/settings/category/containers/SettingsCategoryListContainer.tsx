'use client';

import { toast } from '@shared/services/ToastService';
import {
  CategorySearchUiState,
  CategoryUpdateUiParams,
  SubCategoryUpdateUiParams,
} from '@features/categories/domains/category.uiState';
import { SettingsCategoryCategoryList } from '../components/SettingsCategoryCategoryList';
import { SettingsSubCategoryCreateArgs } from '../components/SettingsCategoryCategoryItem';
import {
  actCategoryDelete,
  actCategorySubCreate,
  actCategorySubDelete,
  actCategorySubUpdate,
  actCategoryUpdate,
} from '../actions/category.action';

interface SettingsCategoryListContainerProps {
  categories: CategorySearchUiState[];
}

export const SettingsCategoryListContainer = ({
  categories,
}: SettingsCategoryListContainerProps) => {
  const handleCategoryDeleteClick = async (id: number) => {
    if (window.confirm('해당 카테고리를 삭제합니까?')) {
      const { isError, message } = await actCategoryDelete(id);

      if (isError) {
        return toast.open('error', message);
      }

      toast.open('success', '삭제 완료');
    }
  };

  const handleSubDeleteClick = async (id: number) => {
    if (window.confirm('해당 카테고리를 삭제합니까?')) {
      const { isError, message } = await actCategorySubDelete(id);

      if (isError) {
        return toast.open('error', message);
      }
      toast.open('success', '삭제 완료');
    }
  };

  const handleCategoryUpdateClick = async (params: CategoryUpdateUiParams) => {
    if (window.confirm('해당 카테고리를 수정합니까?')) {
      const { isError, message } = await actCategoryUpdate(params);

      if (isError) {
        return toast.open('error', message);
      }
      toast.open('success', '수정 완료');
    }
  };

  const handleSubUpdateClick = async (params: SubCategoryUpdateUiParams) => {
    if (window.confirm('해당 카테고리를 수정합니까?')) {
      const { isError, message } = await actCategorySubUpdate(params);

      if (isError) {
        return toast.open('error', message);
      }

      toast.open('success', '수정 완료');
    }
  };

  const handleSubCreateClick = async ({
    id,
    value,
  }: SettingsSubCategoryCreateArgs) => {
    const { isError, message } = await actCategorySubCreate({
      categoryId: id,
      value,
    });

    if (isError) {
      return toast.open('error', message);
    }

    toast.open('success', `서브 카테고리 ${value} 생성 완료`);
  };

  return (
    <SettingsCategoryCategoryList
      categories={categories}
      onCategoryDeleteClick={handleCategoryDeleteClick}
      onCategoryUpdateClick={handleCategoryUpdateClick}
      onSubCreateClick={handleSubCreateClick}
      onSubUpdateClick={handleSubUpdateClick}
      onSubDeleteClick={handleSubDeleteClick}
    />
  );
};
