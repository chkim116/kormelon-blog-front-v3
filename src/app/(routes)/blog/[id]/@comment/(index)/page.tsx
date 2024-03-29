import { actSharedCheckUser } from '@shared/actions/sharedAuth.action';
import { actCommentFetch } from '@features/blog/actions/comment.action';
import { BlogDetailCommentBodyContainerClient } from '@features/blog/containers/detail/BlogDetailCommentBodyContainer.client';
import { BlogDetailCommentTextareaContainerClient } from '@features/blog/containers/detail/BlogDetailCommentTextareaContainer.client';

interface CommentPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export const dynamic = 'force-dynamic';

export default async function CommentPage({
  params,
  searchParams,
}: CommentPageProps) {
  const { data: comments } = await actCommentFetch({
    ...params,
    ...searchParams,
  });

  const {
    data: { id: userId },
  } = await actSharedCheckUser();

  return (
    <>
      <h3 className="font-semibold p-1 mb-2">{comments.length}개의 댓글</h3>
      <BlogDetailCommentTextareaContainerClient isAnonymous={!userId} />
      <BlogDetailCommentBodyContainerClient
        userId={userId}
        comments={comments}
      />
    </>
  );
}
