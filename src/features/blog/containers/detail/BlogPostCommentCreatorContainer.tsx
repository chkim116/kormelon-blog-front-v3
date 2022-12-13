import { useMemo } from 'react';
import { feedbackService } from '@common/components/Feedback';
import { useAppDispatch, useAppSelector } from '@common/store';
import { selUserData } from '@shared/stores/auth';
import { BlogPostCommentCreator } from '@features/blog/components/detail';
import { effBlogPostCommentCreate } from '@features/blog/stores';
import { BaseCommentCreateParamsModel } from '@features/blog/models';

interface BlogPostCommentCreatorContainerProps {
  postId: number;
}

/**
 *
 * @internal
 */
export const BlogPostCommentCreatorContainer = ({
  postId,
}: BlogPostCommentCreatorContainerProps) => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(selUserData);

  const isAnonymous = useMemo(() => !id, [id]);

  const handleSubmit = (commentValue: BaseCommentCreateParamsModel) => {
    dispatch(effBlogPostCommentCreate({ ...commentValue, postId }))
      .unwrap()
      .then(() => {
        feedbackService('success', '댓글이 작성되었습니다.');
      })
      .catch((err) => {
        feedbackService('error', err.message);
      });
  };

  return (
    <BlogPostCommentCreator onSubmit={handleSubmit} isAnonymous={isAnonymous} />
  );
};
