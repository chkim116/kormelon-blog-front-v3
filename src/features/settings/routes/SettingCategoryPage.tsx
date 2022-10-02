import React, { useCallback, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@common/store';
import { SettingCategoryCreatorContainer } from '../containers/SettingCategoryCreatorContainer';
import { SettingCategoryListContainer } from '../containers/SettingCategoryListContainer';
import {
  effCategoriesLoad,
  selCategories,
  selCategoryCreateLoading,
  selCategoryLoading,
} from '../stores';

export const SettingCategoryPage = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selCategoryLoading);
  const createLoading = useAppSelector(selCategoryCreateLoading);
  const categories = useAppSelector(selCategories);

  const loadCategories = useCallback(() => {
    dispatch(effCategoriesLoad());
  }, [dispatch]);

  useEffect(loadCategories, [loadCategories]);

  return (
    <>
      <SettingCategoryCreatorContainer isLoading={createLoading} />

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <SettingCategoryListContainer categories={categories} />
      )}
    </>
  );
};
