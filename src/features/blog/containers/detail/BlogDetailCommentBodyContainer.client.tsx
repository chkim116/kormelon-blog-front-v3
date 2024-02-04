'use client';
import { useState } from 'react';
import { toast } from '@shared/services/ToastService';
import { useQueryParser } from '@shared/hooks/useQueryParser';
import { useFormActionState } from '@shared/hooks/useFormActionState';
import {
  actCommentDelete,
  actCommentUpdate,
} from '@features/blog/actions/comment.action';
import { BlogDetailCommentBody } from '@features/blog/components/detail/BlogDetailCommentBody';
import { commentService } from '@features/blog/domains/comment';
import {
  CommentSearchUiState,
  CommentUpdateUiParams,
  CommentDeleteUiParams,
} from '@features/blog/domains/comment/comment.uiState';
import { BlogDetailCommentReplyContainerClient } from './BlogDetailCommentReplyContainer.client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogDetailCommentBodyContainerClientProps {
  comments: CommentSearchUiState[];
  userId: string;
}

export const BlogDetailCommentBodyContainerClient = ({
  comments,
  userId,
}: BlogDetailCommentBodyContainerClientProps) => {
  const { postId } = useQueryParser(commentService.refineQueryParams);

  const { formAction: updateAction } = useFormActionState(actCommentUpdate, {
    onSuccess() {
      toast.open('success', '댓글이 수정되었습니다.');
    },
    revalidate: true,
  });

  const { formAction: deleteAction } = useFormActionState(actCommentDelete, {
    onSuccess() {
      toast.open('success', '댓글이 삭제되었습니다.');
    },
    revalidate: true,
  });

  const [shownReplyId, setShownReplyId] = useState<string[]>([]);

  const getIsShownReply = (id: string) => {
    const shownReplyIdSet = new Set(shownReplyId);
    return shownReplyIdSet.has(id);
  };

  const handleShowReply = (id: string) => {
    const shownReplyIdSet = new Set(shownReplyId);

    if (getIsShownReply(id)) {
      shownReplyIdSet.delete(id);
      setShownReplyId([...shownReplyIdSet]);
      return;
    }

    shownReplyIdSet.add(id);
    setShownReplyId([...shownReplyIdSet]);
  };

  const handleEdit = async (editValue: CommentUpdateUiParams) => {
    const updateParams: CommentUpdateUiParams = {
      commentValue: editValue.commentValue,
      password: editValue.password,
      commentId: editValue.commentId,
      postId,
      userId,
    };

    await updateAction(updateParams);
  };

  const handleDelete = async (commentId: string, password: string) => {
    const deleteParams: CommentDeleteUiParams = {
      password,
      commentId,
      postId,
      userId,
    };

    await deleteAction(deleteParams);
  };

  return (
    <>
      {comments.map(({ commentReplies, ...props }) => (
        <div key={props.id}>
          <BlogDetailCommentBody
            {...props}
            replyLength={commentReplies.length}
            isAuthor={userId === props.userId}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onShowReply={handleShowReply}
          />

          {getIsShownReply(props.id) && (
            <BlogDetailCommentReplyContainerClient
              userId={userId}
              comments={commentReplies}
              commentId={props.id}
            />
          )}
        </div>
      ))}
    </>
  );
};
