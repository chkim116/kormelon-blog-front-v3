import { BlogCommonCardGridSkeleton } from '@features/blog/components/common/BlogCommonCardGridSkeleton';
import { BlogSearchLandingContentSkeleton } from '@features/blog/components/search/BlogSearchLandingContentSkeleton';

export default async function BlogSearchLoading() {
  return (
    <>
      <BlogSearchLandingContentSkeleton />
      <BlogCommonCardGridSkeleton length={9} />
    </>
  );
}
