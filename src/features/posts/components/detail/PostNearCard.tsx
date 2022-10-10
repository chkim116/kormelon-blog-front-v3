import { useCallback, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grow,
  keyframes,
  Link,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { CallMade } from '@mui/icons-material';
import { PostDetailNearPost } from '@core/entities';
import { intersectionObserver } from '@shared/utils';

const shake = keyframes`
    30% {
      transform: scale(1.2) translateY(-2px);
    }
    100% {
      transform: scale(1) translateY(0px);
    }

`;

interface PostNearCardProps {
  post: PostDetailNearPost;
}

export const PostNearCard = ({ post }: PostNearCardProps) => {
  const [growIn, setGrowIn] = useState(false);

  const refGrowIn = useCallback((element: HTMLElement) => {
    intersectionObserver(element, { threshold: 0.3 }, () => {
      setGrowIn(true);
    });
  }, []);

  return post ? (
    <Grow in={growIn} ref={refGrowIn}>
      <Card sx={{ maxWidth: { xs: '280px', sm: '340px' } }}>
        <NextLink passHref href={`/posts/${post.id}`}>
          <CardActionArea
            LinkComponent={Link}
            sx={{
              width: '100%',
              height: '100%',
              '&:hover': {
                svg: {
                  color: 'text.primary',
                  animation: `${shake} ease 1s infinite`,
                },
              },
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              width={{ xs: '280px', sm: '340px' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  pb: '56.25%',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',

                    img: {
                      objectFit: 'cover',
                    },
                  }}
                >
                  <Image
                    src={post.thumbnail}
                    alt={`${post.title} thumbnail`}
                    layout="fill"
                    width="100%"
                    height="100%"
                  />
                </Box>
              </Box>
              <CardContent>
                <Box
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Typography gutterBottom variant="body1" component="div">
                    {post.title}
                  </Typography>

                  <CallMade
                    fontSize="small"
                    sx={{
                      transition: 'color 0.5s',
                      color: 'text.secondary',
                    }}
                  />
                </Box>
              </CardContent>
            </Box>
          </CardActionArea>
        </NextLink>
      </Card>
    </Grow>
  ) : (
    <Box />
  );
};
