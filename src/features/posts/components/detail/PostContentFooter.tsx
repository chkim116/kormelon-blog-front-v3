import { PersonOutline } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { PostUtils } from './PostUtils';

interface PostContentFooterProps {
  view: number;
  isLiked: boolean;
  onLike: () => void;
  onShare: () => void;
}

export const PostContentFooter = ({
  view,
  isLiked,
  onLike,
  onShare,
}: PostContentFooterProps) => (
  <Box maxWidth="md" mx="auto" px={2}>
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={3}
      width="100%"
    >
      <Box mt={2} display="flex" alignItems="center" height="100%">
        <PersonOutline
          fontSize="medium"
          sx={{
            mt: '-2px',
            mr: '2px',
          }}
        />
        <Typography variant="subtitle2" color="text.secondary">
          {view}
        </Typography>
      </Box>

      <Box display={{ lg: 'none' }}>
        <PostUtils isLiked={isLiked} onLike={onLike} onShare={onShare} />
      </Box>
    </Stack>
  </Box>
);
