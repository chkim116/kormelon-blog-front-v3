import { useEffect, useState } from 'react';
import { Favorite, ShareOutlined, ThumbUp } from '@mui/icons-material';
import { Box, Chip, Fade, IconButton, Stack, Tooltip } from '@mui/material';
import { env } from '@common/env';

interface PostUtilsProps {
  isLiked: boolean;
  onShare: () => void;
  onLike: () => void;
}
export const PostUtils = ({ isLiked, onShare, onLike }: PostUtilsProps) => {
  const [liked, setLiked] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleLike = async () => {
    if (liked) {
      onLike();
      setLiked(false);
      return;
    }

    onLike();
    setFadeIn(true);
    setLiked(true);
    setTimeout(() => setFadeIn(false), 1000);
  };

  const handleCopy = () => {
    if (env.isSSR) {
      return;
    }

    onShare();
  };

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  return (
    <Stack direction="row" mt={2} columnGap={1}>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <IconButton
          sx={{
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            p: 0,
            transition: 'all .5s',
            backgroundColor: liked ? '#feeef3' : '#f6f6f8',
            transform: 'scale(0.88)',
            svg: {
              path: {
                fill: liked ? '#f65c8a' : '#3E4373',
                zIndex: 10,
              },
            },

            '&:hover': {
              backgroundColor: '#feeef3',
              transform: 'scale(0.88)',
              borderRadius: '12px',
              svg: {
                path: {
                  fill: '#f65c8a',
                  zIndex: 10,
                },
              },
            },
          }}
          onClick={handleLike}
        >
          <Favorite />
        </IconButton>
        <Fade in={fadeIn}>
          <Chip
            sx={{
              position: 'absolute',
              bottom: '-45px',
              left: 0,
              width: '100%',
              backgroundColor: '#f65c8a',
              color: '#fff',
            }}
            label={
              <ThumbUp
                sx={{
                  mt: '3px',
                  fontSize: '15px',
                }}
              />
            }
          />
        </Fade>
      </Box>

      <Tooltip title="Click to copy url" arrow>
        <IconButton
          onClick={handleCopy}
          sx={{
            cursor: 'pointer',
          }}
        >
          <ShareOutlined />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
