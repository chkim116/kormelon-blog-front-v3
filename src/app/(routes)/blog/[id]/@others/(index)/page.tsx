import { notFound } from 'next/navigation';
import { toNumber } from 'safers';
import { BlogDetailNearPostContainer } from '@features/blog/containers/detail/BlogDetailNearPostContainer';
import { actBlogDetailSearch } from '@features/blog/actions/blogDetail.action';
import { BlogDetailRecommendPost } from '@features/blog/components/detail/BlogDetailRecommendPost';
import { blogSearchService } from '@features/blog/domains/search';

interface OthersPageProps {
  params: Record<string, string>;
}

export default async function OthersPage({ params }: OthersPageProps) {
  const id = toNumber(params.id);
  const { data, isError } = await actBlogDetailSearch(id);

  if (isError) {
    notFound();
  }

  const { prev, next } = data;
  const recommendPosts = await blogSearchService.fetchRecommends(id);

  return (
    <>
      <BlogDetailNearPostContainer nearPost={{ next, prev }} />
      <BlogDetailRecommendPost posts={recommendPosts} />
    </>
  );
}
