import { LocalOfferOutlined } from '@mui/icons-material';
import { Typography, Stack, Chip } from '@mui/material';
import NextLink from 'next/link';
import { TagWithPostModel } from '@shared/models';

interface TagSearchListProps {
  tags: TagWithPostModel[];
}

export const TagSearchList = ({ tags }: TagSearchListProps) => (
  <>
    <Typography textAlign="center" variant="h4" component="h2">
      태그 목록
    </Typography>
    <Stack
      columnGap={1}
      rowGap={1}
      direction="row"
      justifyContent="center"
      mt={4}
      flexWrap="wrap"
    >
      {tags.map((tag) => (
        <NextLink
          key={tag.id}
          href={`/search?tagId=${tag.id}&tagValue=${tag.value}`}
          passHref
        >
          <Chip
            component="a"
            clickable
            icon={<LocalOfferOutlined fontSize="small" />}
            label={tag.value + ` (${tag.posts.length})`}
            variant="outlined"
            sx={{
              px: 1,
            }}
          />
        </NextLink>
      ))}
    </Stack>
  </>
);
