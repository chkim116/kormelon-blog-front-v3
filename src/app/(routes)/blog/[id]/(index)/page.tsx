import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { toNumber } from 'safers';
import { actSharedCheckUser } from '@shared/actions/sharedAuth.action';
import { createMetaData } from '@shared/domains/meta/sharedMeta.create';
import { actBlogDetailSearch } from '@features/blog/actions/blogDetail.action';
import { BlogDetailContentContainerClient } from '@features/blog/containers/detail/BlogDetailContentContainer.client';
import { blogSearchService } from '@features/blog/domains/search';
import { createBlogSearchUiParams } from '@features/blog/domains/search/blogSearch.create';
import { blogDetailService } from '@features/blog/domains/detail';

interface BlogDetailParams {
  id: number;
}

export interface BlogDetailPageProps {
  params: BlogDetailParams;
}

export async function generateStaticParams() {
  try {
    const { blogs } = await blogSearchService.fetchBlogs({
      ...createBlogSearchUiParams(),
      per: 1000,
    });

    return blogs.map((blog) => blog.id);
  } catch (err) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  try {
    const { blog } = await blogDetailService.fetchBlogDetail(
      toNumber(params.id),
    );

    return createMetaData({
      url: `https://www.kormelon.com/blog/${blog.id}`,
      image: blog.thumbnail,
      description: blog.preview,
      title: blog.title,
    });
  } catch (err) {
    return createMetaData();
  }
}

export const dynamic = 'force-dynamic';

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const id = toNumber(params.id);

  if (!id) {
    notFound();
  }

  const { data: blogData, isError } = await actBlogDetailSearch(id);

  if (isError) {
    notFound();
  }

  const { blog } = blogData;
  const { data: user } = await actSharedCheckUser();
  const isAuthor = blog.user.id === user.id;

  return <BlogDetailContentContainerClient blog={blog} isAuthor={isAuthor} />;
}
