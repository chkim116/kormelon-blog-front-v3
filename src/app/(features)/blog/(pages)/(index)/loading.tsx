import { BlogCommonCardGridSkeleton } from '../../components/common/BlogCommonCardGridSkeleton';
import { BlogSearchLandingContentSkeleton } from '../../components/search/BlogSearchLandingContentSkeleton';

export default async function BlogSearchLoading() {
  return (
    <>
      <BlogSearchLandingContentSkeleton />
      <BlogCommonCardGridSkeleton length={9} />
    </>
  );
}
