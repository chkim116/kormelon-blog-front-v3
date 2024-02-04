'use client';

import { toast } from '@shared/services/ToastService';
import { useFormActionState } from '@shared/hooks/useFormActionState';
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
  const { formAction: deleteCategory } = useFormActionState(actCategoryDelete, {
    onSuccess() {
      toast.open('success', '삭제 완료');
    },
    revalidate: true,
  });

  const { formAction: deleteSubCategory } = useFormActionState(
    actCategorySubDelete,
    {
      onSuccess() {
        toast.open('success', '삭제 완료');
      },
      revalidate: true,
    },
  );
  const { formAction: updateCategory } = useFormActionState(actCategoryUpdate, {
    onSuccess() {
      toast.open('success', '수정 완료');
    },
    revalidate: true,
  });
  const { formAction: updateSubCategory } = useFormActionState(
    actCategorySubUpdate,
    {
      onSuccess() {
        toast.open('success', '수정 완료');
      },
      revalidate: true,
    },
  );
  const { formAction: createSubCategory } = useFormActionState(
    actCategorySubCreate,
    {
      onSuccess({ data: value }) {
        toast.open('success', `서브 카테고리 ${value} 생성 완료`);
      },
      revalidate: true,
    },
  );

  const handleCategoryDeleteClick = async (id: number) => {
    if (window.confirm('해당 카테고리를 삭제합니까?')) {
      await deleteCategory(id);
    }
  };

  const handleSubDeleteClick = async (id: number) => {
    if (window.confirm('해당 카테고리를 삭제합니까?')) {
      await deleteSubCategory(id);
    }
  };

  const handleCategoryUpdateClick = async (params: CategoryUpdateUiParams) => {
    if (window.confirm('해당 카테고리를 수정합니까?')) {
      await updateCategory(params);
    }
  };

  const handleSubUpdateClick = async (params: SubCategoryUpdateUiParams) => {
    if (window.confirm('해당 카테고리를 수정합니까?')) {
      await updateSubCategory(params);
    }
  };

  const handleSubCreateClick = async ({
    id,
    value,
  }: SettingsSubCategoryCreateArgs) => {
    await createSubCategory({
      categoryId: id,
      value,
    });
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
