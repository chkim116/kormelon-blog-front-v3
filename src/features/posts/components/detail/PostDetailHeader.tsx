import React from 'react';
import {
  ArrowRight,
  Delete,
  Edit,
  LocalOfferOutlined,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Avatar,
  Divider,
  Link,
  IconButton,
} from '@mui/material';
import NextLink from 'next/link';
import { PostTag, UserEntity } from '@core/entities';
import { PostCategoryModel } from '@features/posts/models/post.model';

interface PostDetailHeaderProps {
  tags: PostTag[];
  id: number;
  preview: string;
  title: string;
  createdAt: string;
  user: Omit<UserEntity, 'role'>;
  readTime: string;
  category: PostCategoryModel;
  onDelete: (id: number) => void;
}

export const PostDetailHeader = ({
  createdAt,
  id,
  preview,
  tags,
  title,
  user,
  readTime,
  category,
  onDelete,
}: PostDetailHeaderProps) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Box maxWidth="lg" m="0 auto" pt={16} pb={8} px={{ xs: 1, md: 0 }}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton>
          <NextLink href={`/posts/write?edit=${id}`}>
            <Edit />
          </NextLink>
        </IconButton>

        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <NextLink
          passHref
          href={`/posts?categoryId=${category.id}&subCategoryId=${category.subCategoryId}`}
        >
          <Link underline="none">
            <Typography
              fontWeight="bold"
              component="small"
              variant="subtitle2"
              color="text.primary"
            >
              {category.value}
            </Typography>
          </Link>
        </NextLink>

        <ArrowRight fontSize="small" sx={{ mt: '5px' }} />

        <NextLink
          passHref
          href={`/posts?categoryId=${category.id}&subCategoryId=${category.subCategoryId}`}
        >
          <Link underline="none">
            <Typography
              fontWeight="bold"
              component="small"
              variant="subtitle2"
              color="text.secondary"
            >
              {category.subCategoryValue}
            </Typography>
          </Link>
        </NextLink>
      </Box>

      <Box
        textAlign="center"
        maxWidth="md"
        m="0 auto"
        sx={{ wordBreak: 'break-all', whiteSpace: 'pre-line' }}
      >
        <Typography fontWeight="bold" component="h1" variant="h3">
          {title}
        </Typography>

        <Box my={6}>
          <Typography paragraph variant="subtitle1">
            {preview}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="flex-end" justifyContent="center" mt={4}>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            sx={{
              width: '32px',
              height: '32px',
            }}
            src={user.profileImage}
            alt="post author profile"
          />
          <Typography color="text.secondary">by</Typography>
          <Typography>{user.username}</Typography>
        </Box>
      </Box>
      <Divider
        sx={{ mt: { xs: 6, md: 12 }, mb: 4, mx: 'auto', width: '50%' }}
      />
      <Box
        mb={1}
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={{ md: 4 }}
        flexDirection={{ xs: 'column', md: 'row' }}
      >
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="strong"
        >
          Published {createdAt}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          component="strong"
        >
          {readTime}
        </Typography>
      </Box>
      <Stack
        columnGap={1}
        rowGap={1}
        direction="row"
        justifyContent="center"
        mt={4}
        flexWrap="wrap"
      >
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            icon={<LocalOfferOutlined fontSize="small" />}
            label={tag.value}
            variant="outlined"
            sx={{
              px: 1,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};
