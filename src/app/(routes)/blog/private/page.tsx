import { actBlogPrivateSearchLoad } from '@features/blog/actions/blogSearch.action';
import { BlogPrivatePostContainerClient } from '@features/blog/containers/private/BlogPrivatePostContainer.client';
import { actSharedCheckAdmin } from '@shared/actions/sharedAuth.action';

export const dynamic = 'force-dynamic';

export default async function BlogPrivatePostPage() {
  const { isError } = await actSharedCheckAdmin();

  if (isError) {
    throw new Error();
  }

  const { blogs, total } = await actBlogPrivateSearchLoad();

  return <BlogPrivatePostContainerClient blogs={blogs} total={total} />;
}
