import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@common/store';
import { selUserData } from '@shared/stores/auth';
import { UserRoleEnum } from '@core/entities';
import { PostWriteContainer } from '../containers/write/PostWriteContainer';

export const PostWritePage = () => {
  const user = useAppSelector(selUserData);

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
    <>
      <PostWriteContainer />
    </>
  );
};
