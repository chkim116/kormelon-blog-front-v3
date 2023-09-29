'use client';
import { useMemo } from 'react';
import { BaseCommentCreateParamsModel } from '@domain/uiStates';
import { toast } from '@shared/services';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { selUserData } from '@shared/stores/auth';
import { effBlogPostCommentCreate } from '@app/blog/stores';
import { BlogDetailCommentTextarea } from '@app/blog/components/detail';
import { useBlogPostDetailCommentParamsCtx } from '@app/blog/contexts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogDetailCommentTextareaContainerProps {}

export const BlogDetailCommentTextareaContainer = (
  _: BlogDetailCommentTextareaContainerProps,
) => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(selUserData);
  const { postId } = useBlogPostDetailCommentParamsCtx();

  const isAnonymous = useMemo(() => !id, [id]);

  const handleSubmit = async (commentValue: BaseCommentCreateParamsModel) => {
    await dispatch(effBlogPostCommentCreate({ ...commentValue, postId }))
      .unwrap()
      .then(() => {
        toast.open('success', '댓글이 작성되었습니다.');
      })
      .catch((err) => {
        toast.open('error', err.message);
      });
  };

  return (
    <BlogDetailCommentTextarea
      isAnonymous={isAnonymous}
      onSubmit={handleSubmit}
    />
  );
};
