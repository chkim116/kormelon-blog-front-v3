import { Box, Grid } from '@mui/material';
import { PostCard } from '@common/components';
import { SearchPostModel } from '../model';

interface SearchListProps {
  posts: SearchPostModel[];
  loading: boolean;
}

export const SearchList = ({ posts, loading }: SearchListProps) => (
  <Box mt={{ xs: 2, md: 4 }}>
    <Grid
      container
      my={{ xs: 4, md: 10 }}
      spacing={4}
      rowGap={10}
      columns={{ xs: 4, md: 8, lg: 12 }}
    >
      {posts.map((post) => (
        <Grid xs={4} item key={post.id}>
          <PostCard loading={loading} {...post} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
