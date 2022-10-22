import React from 'react';
import { Box, Skeleton } from '@mui/material';

export const PostDetailSkeleton = () => (
  <Box width="100%" py={12} px={1} zIndex={100}>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      maxWidth="lg"
      m="0 auto"
      width="100%"
      height="100%"
    >
      <Skeleton component="small" width={125} sx={{ m: '0 auto' }} />

      <Skeleton sx={{ m: '0 auto' }} component="h1" width="75%" />
      <Skeleton width="60%" component="p" sx={{ mt: 1, mb: 3, mx: 'auto' }} />

      <Skeleton
        component="div"
        variant="rectangular"
        sx={{ mt: 2, mx: 'auto' }}
        width="90%"
        height={500}
      />
    </Box>

    <Box maxWidth="md" width="100%" px={4} mt={4} m="0 auto">
      <Skeleton width="90%" component="p" sx={{ mt: 8 }} />
      <Skeleton width="70%" component="p" sx={{ mt: 1 }} />
      <Skeleton width="85%" component="p" sx={{ mt: 1 }} />
      <Skeleton width="90%" component="p" sx={{ mt: 1 }} />
      <Skeleton width="60%" component="p" sx={{ mt: 1 }} />
    </Box>
  </Box>
);
