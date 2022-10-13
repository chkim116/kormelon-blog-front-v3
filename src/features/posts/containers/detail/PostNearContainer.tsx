import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { PostNearEntity } from '@core/entities';
import { PostNearCard } from '@features/posts/components/detail';

interface PostNearContainerProps {
  postNear: PostNearEntity;
}

export const PostNearContainer = ({ postNear }: PostNearContainerProps) => (
  <Stack
    maxWidth="md"
    px={4}
    m="0 auto"
    direction={{ xs: 'column', md: 'row' }}
    justifyContent="space-between"
    spacing={2}
  >
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      {postNear.prev && (
        <>
          <Typography mb={1} component="div" variant="button" color="secondary">
            prev
          </Typography>
          <PostNearCard post={postNear.prev} />
        </>
      )}
    </Box>
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      {postNear.next && (
        <>
          <Typography
            mb={1}
            component="div"
            width="40px"
            ml="auto"
            variant="button"
            color="secondary"
          >
            next
          </Typography>
          <PostNearCard post={postNear.next} />
        </>
      )}
    </Box>
  </Stack>
);
