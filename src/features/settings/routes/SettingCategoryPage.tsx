import React, { useCallback, useEffect } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@common/store';
import { selUserData } from '@shared/stores/auth';
import { UserRoleEnum } from '@core/entities';
import {
  selCategoryLoading,
  selCategoryCreateLoading,
  selCategories,
  effCategoriesLoad,
} from '@shared/stores/category';
import { SettingCategoryCreatorContainer } from '../containers/SettingCategoryCreatorContainer';
import { SettingCategoryListContainer } from '../containers/SettingCategoryListContainer';

export const SettingCategoryPage = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selUserData);
  const isLoading = useAppSelector(selCategoryLoading);
  const createLoading = useAppSelector(selCategoryCreateLoading);
  const categories = useAppSelector(selCategories);

  const loadCategories = useCallback(() => {
    dispatch(effCategoriesLoad());
  }, [dispatch]);

  useEffect(loadCategories, [loadCategories]);

  if (!user.id || user.role === UserRoleEnum.MEMBER) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        접근할 수 없습니다.
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
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
    </Container>
  );
};
