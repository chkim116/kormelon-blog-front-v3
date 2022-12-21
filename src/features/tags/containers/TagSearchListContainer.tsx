import { Container } from '@mui/material';
import { useAppSelector } from '@common/store';
import { selTagLoadTags } from '@shared/stores/tag';
import { TagSearchList } from '../components/TagSearchList';

export const TagSearchListContainer = () => {
  const allTags = useAppSelector(selTagLoadTags);

  return (
    <Container sx={{ py: 20 }}>
      <TagSearchList tags={allTags} />
    </Container>
  );
};
