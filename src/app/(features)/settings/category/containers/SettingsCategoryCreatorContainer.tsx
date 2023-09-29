'use client';
import { toast } from '@shared/services';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import {
  effCategoriesCreate,
  selCategoryLoading,
} from '@shared/stores/category';
import { SettingsCategoryCreator } from '../components';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SettingsCategoryCreatorContainerProps {}

export const SettingsCategoryCreatorContainer = (
  _: SettingsCategoryCreatorContainerProps,
) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selCategoryLoading);

  const handleSubmit = async (value: string) => {
    try {
      await dispatch(effCategoriesCreate({ value })).unwrap();
      toast.open('success', `카테고리 ${value} 생성`);
    } catch (err) {
      toast.open('error', (err as Error).message);
    }
  };

  return (
    <SettingsCategoryCreator loading={isLoading} onSubmit={handleSubmit} />
  );
};
