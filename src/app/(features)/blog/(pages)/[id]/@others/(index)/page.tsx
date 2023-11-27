import { notFound } from 'next/navigation';
import { toNumber } from 'safers';
import { BlogDetailNearPostContainer } from '@app/blog/containers/detail/BlogDetailNearPostContainer';
import { BlogDetailRecommendPostContainer } from '@app/blog/containers/detail/BlogDetailRecommendPostContainer';
import { actBlogDetailSearch } from '@app/blog/actions/blogDetail.action';

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

  return (
    <>
      <BlogDetailNearPostContainer nearPost={{ next, prev }} />
      <BlogDetailRecommendPostContainer />
    </>
  );
}
