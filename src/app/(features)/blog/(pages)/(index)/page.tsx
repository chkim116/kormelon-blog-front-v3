import { toNumber } from 'safers';
import { notFound } from 'next/navigation';
import { BlogSearchPostPaginationContainerClient } from '../../containers/search/BlogSearchPostPaginationContainer.client';
import { actBlogSearchLoad } from '../../actions/blogSearch.action';
import { BlogCommonCardGrid } from '../../components/common/BlogCommonCardGrid';
import { BlogSearchLandingContent } from '../../components/search/BlogSearchLandingContent';

interface BlogSearchPageProps {
  searchParams: Record<string, string>;
}

export default async function BlogSearchPage({
  searchParams,
}: BlogSearchPageProps) {
  const { data } = await actBlogSearchLoad(searchParams);

  if (!data) {
    notFound();
  }

  const { blogData, currentCategoryName, currentSubCategoryName } = data;
  const { blogs, totalPage } = blogData;

  const titlePrefix = currentSubCategoryName ? currentSubCategoryName : 'All';

  return (
    <>
      <BlogSearchLandingContent categoryName={currentCategoryName} />
      <BlogCommonCardGrid title={`${titlePrefix} Post`} blogs={blogs} />
      <BlogSearchPostPaginationContainerClient
        totalPage={totalPage}
        page={toNumber(searchParams.page, 1)}
      />
    </>
  );
}
