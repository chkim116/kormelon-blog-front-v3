import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '@common/store';
import { feedbackService } from '@common/components/Feedback';
import { effCategoriesCreate } from '../stores';

interface SettingCategoryCreatorContainerProps {
  isLoading: boolean;
}

export const SettingCategoryCreatorContainer = ({
  isLoading,
}: SettingCategoryCreatorContainerProps) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    if (!value) {
      setErrorMessage('값을 입력해 주세요.');
      return;
    }

    setErrorMessage('');
    value.trim();

    dispatch(effCategoriesCreate({ value }))
      .then(() => {
        feedbackService('success', `카테고리 ${value} 생성`);
        setValue('');
      })
      .catch((err) => feedbackService('error', err.response.data.message));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box
      component="form"
      display="flex"
      maxWidth="sm"
      alignItems="flex-start"
      autoComplete="off"
      py={4}
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        data-cy="create-category-input"
        id="category"
        name="category"
        label="카테고리 입력"
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        onChange={handleChange}
      />
      <LoadingButton
        data-cy="create-category-submit"
        loading={isLoading}
        type="submit"
        variant="contained"
        sx={{ height: '56px' }}
      >
        저장
      </LoadingButton>
    </Box>
  );
};
