import { actSharedCheckAdmin } from '@shared/actions/sharedAuth.action';
import { actBlogPrivateSearchLoad } from '@app/blog/actions/blogSearch.action';
import { BlogPrivatePostContainerClient } from '../../containers/private/BlogPrivatePostContainer.client';

export const dynamic = 'force-dynamic';

export default async function BlogPrivatePostPage() {
  const { isError } = await actSharedCheckAdmin();

  if (isError) {
    throw new Error();
  }

  const { blogs, total } = await actBlogPrivateSearchLoad();

  return <BlogPrivatePostContainerClient blogs={blogs} total={total} />;
}
