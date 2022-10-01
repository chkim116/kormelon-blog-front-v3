import React from 'react';
import { CategoryList } from '../components/CategoryList';
import { CategorySubList } from '../components/CategorySubList';

// TODO: 수정과 삭제
export const SettingCategoryListContainer = () => (
  <div>
    <CategoryList>
      <CategorySubList />
    </CategoryList>
  </div>
);
