'use client';
import { toast } from '@shared/services/ToastService';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import { useFormActionState } from '@shared/hooks/useFormActionState';
import { useUserSession } from '@shared/hooks/useUserSession';
import { actCommentCreate } from '@features/blog/actions/comment.action';
import { BlogDetailCommentTextarea } from '@features/blog/components/detail/BlogDetailCommentTextarea';
import { commentService } from '@features/blog/domains/comment';
import { CommentCreateUiParams } from '@features/blog/domains/comment/comment.uiState';

interface BlogDetailCommentTextareaContainerClientProps {
  isAnonymous: boolean;
}

export const BlogDetailCommentTextareaContainerClient = ({
  isAnonymous,
}: BlogDetailCommentTextareaContainerClientProps) => {
  const { id: userId } = useUserSession();

  const { formAction } = useFormActionState(actCommentCreate, {
    onSuccess() {
      toast.open('success', '댓글이 작성되었습니다.');
    },
    revalidate: true,
  });

  const { postId } = useQueryParser(commentService.refineQueryParams);

  const handleSubmit = async (commentValue: CommentCreateUiParams) => {
    await formAction({ ...commentValue, userId, postId });
  };

  return (
    <BlogDetailCommentTextarea
      isAnonymous={isAnonymous}
      onSubmit={handleSubmit}
    />
  );
};
