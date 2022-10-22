import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

export const BlogPostHero = () => (
  <Box
    component="section"
    sx={{
      position: 'relative',
      width: '100%',
      height: '480px',
      display: 'flex',
      textAlign: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box maxWidth="xl">
      <Box>
        <Typography
          variant="button"
          component="small"
          color="primary"
          fontWeight="bold"
        >
          Kormelon blog
        </Typography>
      </Box>
      <Box mt={2} mb={4}>
        <Typography fontWeight="bold" variant="h3" component="h1">
          Read it all.
        </Typography>
      </Box>
      <Box>
        <Typography
          lineHeight="38px"
          variant="h6"
          paragraph
          color="text.secondary"
        >
          Development, insights,
          <br />
          work approaches and more
        </Typography>
      </Box>
      <Divider />
    </Box>
  </Box>
);
