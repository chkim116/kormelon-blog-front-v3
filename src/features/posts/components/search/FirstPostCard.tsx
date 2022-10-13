import { Box, Link, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { PostModel } from '@features/posts/models/post.model';

interface FirstPostCardProps extends PostModel {
  loading?: boolean;
}

export const FirstPostCard = ({
  loading,
  createdAt,
  id,
  preview,
  readTime,
  thumbnail,
  title,
}: FirstPostCardProps) =>
  loading ? (
    <Box
      display="flex"
      width="100%"
      flexDirection={{ xs: 'column', md: 'row' }}
    >
      <Box
        position="relative"
        flex={1.5}
        mb={2}
        pb={{ xs: '56.25%', md: '37.5%' }}
      >
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

      <Box
        display="flex"
        flexDirection="column"
        flex={1}
        mt={0}
        ml={{ xs: 0, md: 2 }}
      >
        <Box display="flex" justifyContent="space-between">
          <Skeleton width={75} />
          <Skeleton width={75} />
        </Box>
        <Skeleton
          variant="rectangular"
          width="80%"
          height={24}
          sx={{ mt: 1 }}
        />
        <Skeleton sx={{ mt: 2 }} variant="rectangular" height={48} />
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
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
      <Box position="relative" flex={1.5} pb={{ xs: '56.25%', md: '37.5%' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            '& img': {
              objectFit: 'cover',
            },
          }}
        >
          <NextLink passHref href={`/posts/${id}`}>
            <Link>
              <Image priority src={thumbnail} alt={title} layout="fill" />
            </Link>
          </NextLink>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        flex={1}
        mt={{ xs: 2, md: 0 }}
        ml={{ md: 2 }}
      >
        <Box>
          <Box display="flex" justifyContent="space-between" mb={{ md: 2 }}>
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
                variant="h5"
                fontWeight="bold"
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
              sx={{ wordBreak: 'break-all', whiteSpace: 'pre-line' }}
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
