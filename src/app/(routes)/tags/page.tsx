import { actTagsSearchAllLoad } from '@shared/actions/sharedTag.action';
import { TagSearchList } from '@features/tags/components/TagSearchList';

interface TagsPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default async function TagsPage(_: TagsPageProps) {
  const { data: tags } = await actTagsSearchAllLoad();

  return <TagSearchList tags={tags} />;
}
