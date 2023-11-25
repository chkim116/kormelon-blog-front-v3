'use client';
import { useMemo } from 'react';
import { Divider } from '@nextui-org/react';
import { commentService } from '@domain/comment';
import {
  CommentCreateUiParams,
  CommentReplyCreateUiParams,
  CommentReplyDeleteUiParams,
  CommentReplySearchUiState,
  CommentReplyUpdateUiParams,
} from '@domain/comment/comment.uiState';
import { useQueryParser } from 'src/app/shared/hooks/useQueryParser';
import { toast } from 'src/app/shared/services/ToastService';
import { useFormActionState } from 'src/app/shared/hooks/useFormActionState';
import {
  actCommentReplyCreate,
  actCommentReplyDelete,
  actCommentReplyUpdate,
} from '@app/blog/actions/comment.action';
import { BlogDetailCommentBody } from '@app/blog/components/detail/BlogDetailCommentBody';
import { BlogDetailCommentTextarea } from '@app/blog/components/detail/BlogDetailCommentTextarea';

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
      onError({ message }) {
        toast.open('error', message);
      },
    },
  );

  const { formAction: updateAction } = useFormActionState(
    actCommentReplyUpdate,
    {
      onSuccess() {
        toast.open('success', '댓글이 수정되었습니다.');
      },
      onError({ message }) {
        toast.open('error', message);
      },
    },
  );

  const { formAction: deleteAction } = useFormActionState(
    actCommentReplyDelete,
    {
      onSuccess() {
        toast.open('success', '댓글이 삭제되었습니다.');
      },
      onError({ message }) {
        toast.open('error', message);
      },
    },
  );

  const isAnonymous = useMemo(() => !userId, [userId]);

  const handleSubmit = async (commentValue: CommentCreateUiParams) => {
    const createParams: CommentReplyCreateUiParams = {
      ...commentValue,
      commentId,
      postId,
    };
    await createAction(createParams);
  };

  const handleEdit = async (editValue: CommentReplyUpdateUiParams) => {
    const updateParams: CommentReplyUpdateUiParams = {
      commentValue: editValue.commentValue,
      password: editValue.password,
      commentId: editValue.commentId,
      postId,
    };

    await updateAction(updateParams);
  };

  const handleDelete = async (commentId: string, password: string) => {
    const deleteParams: CommentReplyDeleteUiParams = {
      password,
      commentId,
      postId,
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
