import { actTagWithBlogsLoad } from '@shared/actions/sharedTag.action';
import { tagService } from '@shared/domains/tag';
import { SearchList } from '@features/search/components/SearchList';

interface SearchTagsPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default async function SearchTagsPage({
  searchParams,
}: SearchTagsPageProps) {
  const params = tagService.refineQueryParams(searchParams);

  const { data } = await actTagWithBlogsLoad(params);

  const { blogs, total } = data;
  const { tagValue } = params;

  return (
    <SearchList
      title={`${tagValue} 검색 결과 : ${total}개의 게시글`}
      posts={blogs}
    />
  );
}
