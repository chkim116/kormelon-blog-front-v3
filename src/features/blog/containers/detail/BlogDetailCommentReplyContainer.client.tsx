'use client';
import { useMemo } from 'react';
import { Divider } from '@nextui-org/react';
import { useQueryParser } from '@common/hooks/useQueryParser';
import { toast } from '@common/lib/ToastService';
import { useFormActionState } from '@common/hooks/useFormActionState';
import {
  actCommentReplyCreate,
  actCommentReplyDelete,
  actCommentReplyUpdate,
} from '@features/blog/actions/comment.action';
import { BlogDetailCommentBody } from '@features/blog/components/detail/BlogDetailCommentBody';
import { BlogDetailCommentTextarea } from '@features/blog/components/detail/BlogDetailCommentTextarea';
import { commentService } from '@features/blog/domains/comment';
import {
  CommentCreateUiParams,
  CommentReplyCreateUiParams,
  CommentReplyDeleteUiParams,
  CommentReplySearchUiState,
  CommentReplyUpdateUiParams,
} from '@features/blog/domains/comment/comment.uiState';

interface BlogDetailCommentReplyContainerClientProps {
  comments: CommentReplySearchUiState[];
  commentId: string;
  userId: string;
}

export const BlogDetailCommentReplyContainerClient = ({
  comments,
  commentId,
  userId,
}: BlogDetailCommentReplyContainerClientProps) => {
  const { postId } = useQueryParser(commentService.refineQueryParams);

  const { formAction: createAction } = useFormActionState(
    actCommentReplyCreate,
    {
      onSuccess() {
        toast.open('success', '댓글이 작성되었습니다.');
      },
      revalidate: true,
    },
  );

  const { formAction: updateAction } = useFormActionState(
    actCommentReplyUpdate,
    {
      onSuccess() {
        toast.open('success', '댓글이 수정되었습니다.');
      },
      revalidate: true,
    },
  );

  const { formAction: deleteAction } = useFormActionState(
    actCommentReplyDelete,
    {
      onSuccess() {
        toast.open('success', '댓글이 삭제되었습니다.');
      },
      revalidate: true,
    },
  );

  const isAnonymous = useMemo(() => !userId, [userId]);

  const handleSubmit = async (commentValue: CommentCreateUiParams) => {
    const createParams: CommentReplyCreateUiParams = {
      ...commentValue,
      commentId,
      postId,
      userId,
    };
    await createAction(createParams);
  };

  const handleEdit = async (editValue: CommentReplyUpdateUiParams) => {
    const updateParams: CommentReplyUpdateUiParams = {
      commentValue: editValue.commentValue,
      password: editValue.password,
      commentId: editValue.commentId,
      postId,
      userId,
    };

    await updateAction(updateParams);
  };

  const handleDelete = async (commentId: string, password: string) => {
    const deleteParams: CommentReplyDeleteUiParams = {
      password,
      commentId,
      postId,
      userId,
    };

    await deleteAction(deleteParams);
  };

  return (
    <div className="ml-5">
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="text-gray-300 font-bold pl-14">|</div>
          <BlogDetailCommentBody
            {...comment}
            isAuthor={userId === comment.userId}
            onDelete={handleDelete}
            onEdit={handleEdit}
            shownReply={false}
          />
        </div>
      ))}

      <div className="pt-4 pb-8">
        <BlogDetailCommentTextarea
          isAnonymous={isAnonymous}
          onSubmit={handleSubmit}
        />
      </div>
      <Divider />
    </div>
  );
};
