import { Box, Link, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { PostModel } from '@features/posts/models/post.model';

interface PostCardProps extends PostModel {
  loading?: boolean;
}

export const PostCard = ({
  loading = false,
  createdAt,
  thumbnail,
  title,
  id,
  preview,
  readTime,
}: PostCardProps) =>
  loading ? (
    <Box>
      <Box position="relative" mb={2} pb={{ xs: '56.25%', md: '70%' }}>
        <Box
          component={Skeleton}
          variant="rectangular"
          position="absolute"
          width="100%"
          height="100%"
          top={0}
          left={0}
        />
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Skeleton width={75} />
        <Skeleton width={75} />
      </Box>
      <Skeleton variant="rectangular" width="80%" height={24} sx={{ mt: 1 }} />
      <Skeleton sx={{ mt: 2 }} variant="rectangular" height={48} />
    </Box>
  ) : (
    <Box
      sx={{
        height: '100%',
        '&:hover img': {
          transform: 'scale(1.1)',
          transition: 'all 0.5s',
        },
        '&:not(:hover) img': {
          transform: 'scale(1)',
          transition: 'all 1s',
        },
      }}
    >
      <Box position="relative" mb={2} pb={{ xs: '56.25%', md: '70%' }}>
        <Box
          position="absolute"
          width="100%"
          height="100%"
          top={0}
          left={0}
          sx={{
            '& img': {
              objectFit: 'cover',
            },
          }}
        >
          <NextLink passHref href={`/posts/${id}`}>
            <Link>
              <Image src={thumbnail} alt={title + 'thumbnail'} layout="fill" />
            </Link>
          </NextLink>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        maxHeight="180px"
        height="100%"
      >
        <Box flex={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="strong"
            >
              {readTime}
            </Typography>
            <Typography
              variant="button"
              color="text.secondary"
              component="strong"
            >
              {createdAt}
            </Typography>
          </Box>

          <NextLink passHref href={`/posts/${id}`}>
            <Link underline="none">
              <Typography
                fontWeight="bold"
                variant="h5"
                component="h4"
                mt={1}
                color="text.primary"
              >
                {title}
              </Typography>
            </Link>
          </NextLink>

          <Box pt={1}>
            <Typography
              paragraph
              variant="subtitle1"
              color="text.secondary"
              component="strong"
            >
              {preview}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
