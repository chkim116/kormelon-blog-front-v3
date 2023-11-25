import { actSharedCheckAdmin } from 'src/app/shared/actions/sharedAuth.action';
import { blogWriteService } from '@domain/blog/write';
import { createBlogDetailUiState } from '@domain/blog/detail/blogDetail.create';
import {
  actBlogWriteDetailLoad,
  actBlogWritePrivateDetailLoad,
} from '@app/blog/actions/blogWrite.action';
import { BlogWriteContainerClient } from '@app/blog/containers/write/BlogWriteContainer.client';
import { actCategoriesLoad } from '@app/settings/category/actions/category.action';

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
      blog = (await actBlogWritePrivateDetailLoad(searchParams)).data;
    } else {
      blog = (await actBlogWriteDetailLoad(searchParams)).data;
    }
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
