import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface PostThumbnailProps {
  src: string;
  alt: string;
}

export const PostThumbnail = ({ src, alt }: PostThumbnailProps) => (
  <Box position="relative" width="98%" height="100%" pb="56.25%" m="0 auto">
    <Box
      position="absolute"
      width="100%"
      height="100%"
      sx={{
        img: {
          borderRadius: '20px',
          objectFit: 'cover',
        },
      }}
    >
      <Image priority src={src} alt={alt} layout="fill" />
    </Box>
  </Box>
);
