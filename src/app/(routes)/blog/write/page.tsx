import { isNullish } from 'safers';
import { notFound } from 'next/navigation';
import { actSharedCheckAdmin } from '@shared/actions/sharedAuth.action';
import {
  actBlogWriteDetailLoad,
  actBlogWritePrivateDetailLoad,
} from '@features/blog/actions/blogWrite.action';
import { BlogWriteContainerClient } from '@features/blog/containers/write/BlogWriteContainer.client';
import { actCategoriesLoad } from '@features/settings/category/actions/category.action';
import { blogWriteService } from '@features/blog/domains/write';
import { createBlogDetailUiState } from '@features/blog/domains/detail/blogDetail.create';

interface BlogWritePageProps {
  searchParams: Record<string, string>;
}

export const dynamic = 'force-dynamic';

export default async function BlogWritePage({
  searchParams,
}: BlogWritePageProps) {
  const { isError } = await actSharedCheckAdmin();

  if (isError) {
    throw new Error();
  }

  const { editId, isPrivateMode } =
    blogWriteService.refineQueryParams(searchParams);

  let blog = createBlogDetailUiState();

  if (editId) {
    if (isPrivateMode) {
      const { data: privateBlog } = await actBlogWritePrivateDetailLoad(
        searchParams,
      );

      if (privateBlog) {
        blog = privateBlog;
      }
    } else {
      const { data: blogData } = await actBlogWriteDetailLoad(searchParams);

      if (blogData) {
        blog = blogData;
      }
    }
  }

  if (isNullish(blog)) {
    notFound();
  }

  const { data: categories } = await actCategoriesLoad();

  return (
    <BlogWriteContainerClient
      categories={categories}
      editId={editId}
      blog={blog}
    />
  );
}
