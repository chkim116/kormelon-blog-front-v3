import { useAppSelector } from '@shared/stores';
import { selTagLoadTags } from '@shared/stores/tag';
import { TagSearchList } from '../components/TagSearchList';

export const TagSearchListContainer = () => {
  const allTags = useAppSelector(selTagLoadTags);

  return <TagSearchList tags={allTags} />;
};
