import { Container, Typography } from '@mui/material';
import { useAppSelector } from '@common/store';
import { SearchList } from '../components';
import {
  selSearchPostLoading,
  selSearchPosts,
  selSearchTotal,
} from '../stores';

interface SearchListContainerProps {
  tagValue: string;
}

export const SearchListContainer = ({ tagValue }: SearchListContainerProps) => {
  const posts = useAppSelector(selSearchPosts);
  const total = useAppSelector(selSearchTotal);
  const loading = useAppSelector(selSearchPostLoading);

  return (
    <Container maxWidth="lg">
      <Typography
        textAlign="center"
        variant="h4"
        component="h2"
        sx={{ mt: 15 }}
      >
        <strong>{tagValue}</strong>
        태그 검색: 총 {total}개의 게시글
      </Typography>
      <SearchList posts={posts} loading={loading} />
    </Container>
  );
};
