'use client';
import { actCommentCreate } from '@features/blog/actions/comment.action';
import { BlogDetailCommentTextarea } from '@features/blog/components/detail/BlogDetailCommentTextarea';
import { toast } from '@shared/services/ToastService';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import { commentService } from '@features/blog/domains/comment';
import { CommentCreateUiParams } from '@features/blog/domains/comment/comment.uiState';
import { useFormActionState } from '@shared/hooks/useFormActionState';

interface BlogDetailCommentTextareaContainerClientProps {
  isAnonymous: boolean;
}

export const BlogDetailCommentTextareaContainerClient = ({
  isAnonymous,
}: BlogDetailCommentTextareaContainerClientProps) => {
  const { formAction } = useFormActionState(actCommentCreate, {
    onSuccess() {
      toast.open('success', '댓글이 작성되었습니다.');
    },
    onError({ message }) {
      toast.open('error', message);
    },
  });

  const { postId } = useQueryParser(commentService.refineQueryParams);

  const handleSubmit = async (commentValue: CommentCreateUiParams) => {
    await formAction({ ...commentValue, postId });
  };

  return (
    <BlogDetailCommentTextarea
      isAnonymous={isAnonymous}
      onSubmit={handleSubmit}
    />
  );
};
