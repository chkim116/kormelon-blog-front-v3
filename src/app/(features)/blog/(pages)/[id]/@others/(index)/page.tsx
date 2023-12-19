import { notFound } from 'next/navigation';
import { toNumber } from 'safers';
import { blogSearchService } from '@domain/blog/search';
import { BlogDetailNearPostContainer } from '@app/blog/containers/detail/BlogDetailNearPostContainer';
import { actBlogDetailSearch } from '@app/blog/actions/blogDetail.action';
import { BlogDetailRecommendPost } from '@app/blog/components/detail/BlogDetailRecommendPost';

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
