'use client';
import { toast } from 'src/app/shared/services/ToastService';
import { useQueryParser } from 'src/app/shared/hooks/useQueryParser';
import { commentService } from '@domain/comment';
import { CommentCreateUiParams } from '@domain/comment/comment.uiState';
import { useFormActionState } from 'src/app/shared/hooks/useFormActionState';
import { actCommentCreate } from '@app/blog/actions/comment.action';
import { BlogDetailCommentTextarea } from '@app/blog/components/detail/BlogDetailCommentTextarea';

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
