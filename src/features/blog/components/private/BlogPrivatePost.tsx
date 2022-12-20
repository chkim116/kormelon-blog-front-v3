import { Delete, Edit, Lock } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { PostCard } from '@common/components';
import { BlogPostModel } from '@features/blog/models';

interface BlogPrivatePostProps {
  loading: boolean;
  privatePosts: BlogPostModel[];
  privateTotal: number;
  onDelete: (id: number) => void;
}

export const BlogPrivatePost = ({
  loading,
  privatePosts,
  privateTotal,
  onDelete,
}: BlogPrivatePostProps) => {
  const handleDeleteCurried = (id: number) => () => {
    onDelete(id);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        textAlign="center"
        variant="h4"
        component="h2"
        sx={{ mt: 15 }}
      >
        총 {privateTotal}개의 비밀 게시글 <Lock />
      </Typography>
      <Box mt={{ xs: 2, md: 4 }}>
        <Grid
          container
          my={{ xs: 4, md: 10 }}
          spacing={4}
          rowGap={10}
          columns={{ xs: 4, md: 8, lg: 12 }}
        >
          {privatePosts.map((post) => (
            <Grid xs={4} item key={post.id}>
              <Box>
                <Box display="flex" justifyContent="flex-end">
                  <Link href={`/blog/write?edit=${post.id}&isPrivate=true`}>
                    <Button LinkComponent="a" color="primary">
                      <Edit /> 수정하기
                    </Button>
                  </Link>
                  <Button onClick={handleDeleteCurried(post.id)}>
                    <Delete /> 삭제하기
                  </Button>
                </Box>
                <PostCard loading={loading} {...post} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
