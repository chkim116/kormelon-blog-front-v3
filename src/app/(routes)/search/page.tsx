import { actBlogSearchLoad } from '@features/blog/actions/blogSearch.action';
import { SearchListContainerClient } from '@features/search/containers/SearchListContainer.client';

interface SearchPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const {
    data: { blogData, params },
  } = await actBlogSearchLoad(searchParams);

  if (!params.keyword && !params.categoryId && !params.subCategoryId) {
    throw new Error();
  }

  const { blogs, total, totalPage } = blogData;

  return (
    <SearchListContainerClient
      keyword={params.keyword}
      page={params.page}
      blogs={blogs}
      total={total}
      totalPage={totalPage}
    />
  );
}
