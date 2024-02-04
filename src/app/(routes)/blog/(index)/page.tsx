import { toNumber } from 'safers';
import { BlogSearchPostPaginationContainerClient } from '@features/blog/containers/search/BlogSearchPostPaginationContainer.client';
import { actBlogSearchLoad } from '@features/blog/actions/blogSearch.action';
import { BlogCommonCardGrid } from '@features/blog/components/common/BlogCommonCardGrid';
import { BlogSearchLandingContent } from '@features/blog/components/search/BlogSearchLandingContent';

interface BlogSearchPageProps {
  searchParams: Record<string, string>;
}

export const dynamic = 'force-dynamic';

export default async function BlogSearchPage({
  searchParams,
}: BlogSearchPageProps) {
  const { data, isError } = await actBlogSearchLoad(searchParams);

  if (isError) {
    throw new Error('블로그 글 목록을 불러오는데 실패했습니다.');
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
