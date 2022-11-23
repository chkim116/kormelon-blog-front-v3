/* eslint-disable indent */
import { Fragment, useEffect, useState } from 'react';
import { List } from '@mui/material';
import { feedbackService } from '@common/components/Feedback';
import { useAppDispatch } from '@common/store';
import {
  CategoryEntity,
  CategoryUpdateParams,
  SubCategoryUpdateParams,
} from '@core/entities';
import {
  effSubCategoriesDelete,
  effCategoriesDelete,
  effSubCategoriesUpdate,
  effCategoriesUpdate,
  effSubCategoriesCreate,
} from '@shared/stores/category';
import { CategoryItem } from '../components/CategoryItem';

interface SettingCategoryListContainerProps {
  categories: CategoryEntity[];
}

function refineNumbers(ids: number[], id: number) {
  const isExist = ids.some((prevId) => prevId === id);
  if (isExist) {
    return ids.filter((prevId) => prevId !== id);
  }
  return [...ids, id];
}

export const SettingCategoryListContainer = ({
  categories,
}: SettingCategoryListContainerProps) => {
  const dispatch = useAppDispatch();

  const [openIds, setOpenIds] = useState<number[]>([]);

  const handleCollapse = (id: number) => {
    setOpenIds((prev) => refineNumbers(prev, id));
  };

  const handleDeleteCategory = (isSubCategory: boolean, id: number) => {
    if (window.confirm('해당 카테고리를 삭제합니까?')) {
      dispatch(
        isSubCategory ? effSubCategoriesDelete(id) : effCategoriesDelete(id),
      )
        .unwrap()
        .then(() => {
          feedbackService('success', '삭제 완료');
        })
        .catch((err) => feedbackService('error', err.response?.data.message));
    }
  };

  const handleUpdate = (
    isSubCategory: boolean,
    params: CategoryUpdateParams | SubCategoryUpdateParams,
  ) => {
    if (window.confirm('해당 카테고리를 수정합니까?')) {
      isSubCategory
        ? dispatch(effSubCategoriesUpdate(params as SubCategoryUpdateParams))
            .unwrap()
            .then(() => {
              feedbackService('success', '수정 완료');
            })
            .catch((err) =>
              feedbackService('error', err.response?.data.message),
            )
        : dispatch(effCategoriesUpdate(params as CategoryUpdateParams))
            .unwrap()
            .then(() => {
              feedbackService('success', '수정 완료');
            })
            .catch((err) =>
              feedbackService('error', err.response?.data.message),
            );
    }
  };

  const handleAdd = (id: number, value: string) => {
    dispatch(effSubCategoriesCreate({ categoryId: id, value }))
      .unwrap()
      .then(() => {
        feedbackService('success', `서브 카테고리 ${value} 생성 완료`);
      })
      .catch((err) => feedbackService('error', err.response?.data.message));
  };

  useEffect(() => {
    setOpenIds(categories.map((category) => category.id));
  }, [categories]);

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="div"
      aria-labelledby="nested-list-subheader"
    >
      {categories.map((category) => (
        <Fragment key={category.id}>
          <CategoryItem
            {...category}
            openIds={openIds}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onCollapse={handleCollapse}
            onDelete={handleDeleteCategory}
          />
        </Fragment>
      ))}
    </List>
  );
};
