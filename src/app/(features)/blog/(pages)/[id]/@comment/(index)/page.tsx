import { notFound } from 'next/navigation';
import { actSharedCheckUser } from 'src/app/shared/actions/sharedAuth.action';
import { actCommentFetch } from '@app/blog/actions/comment.action';
import { BlogDetailCommentBodyContainerClient } from '@app/blog/containers/detail/BlogDetailCommentBodyContainer.client';
import { BlogDetailCommentTextareaContainerClient } from '@app/blog/containers/detail/BlogDetailCommentTextareaContainer.client';

interface CommentPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export default async function CommentPage({
  params,
  searchParams,
}: CommentPageProps) {
  const { data: comments, isError } = await actCommentFetch({
    ...params,
    ...searchParams,
  });

  if (isError) {
    notFound();
  }

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