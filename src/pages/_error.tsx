import React from 'react';
import { Box, Typography } from '@mui/material';

const ErrorPage = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100%"
    height="80vh"
  >
    <Typography variant="h3" component="h1">
      없는 컨텐츠입니다 :(
    </Typography>
  </Box>
);

export default ErrorPage;
