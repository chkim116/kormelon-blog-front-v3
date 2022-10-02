import React from 'react';
import { CategoryEntity } from '@core/entities';
import { CategoryList } from '../components/CategoryList';
import { CategorySubList } from '../components/CategorySubList';

interface SettingCategoryListContainerProps {
  categories: CategoryEntity[];
}

// TODO: 수정과 삭제
export const SettingCategoryListContainer = ({
  categories,
}: SettingCategoryListContainerProps) => (
  <div>
    <CategoryList>
      <CategorySubList />
    </CategoryList>
  </div>
);
