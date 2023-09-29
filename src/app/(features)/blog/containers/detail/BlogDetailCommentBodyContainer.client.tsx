'use client';
import { useState } from 'react';
import {
  BaseCommentCreateParamsModel,
  BlogPostCommentDeleteParamsModel,
  BlogPostCommentUpdateParamsModel,
} from '@domain/uiStates';
import { toast } from '@shared/services';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { selUserData } from '@shared/stores/auth';
import { BlogDetailCommentBody } from '@app/blog/components/detail';
import { useBlogPostDetailCommentParamsCtx } from '@app/blog/contexts';
import {
  effBlogPostCommentDelete,
  effBlogPostCommentUpdate,
  selBlogPostComments,
} from '@app/blog/stores';
import { BlogDetailCommentReplyContainerClient } from './BlogDetailCommentReplyContainer.client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BlogDetailCommentBodyContainerClientProps {}

export const BlogDetailCommentBodyContainerClient = (
  _: BlogDetailCommentBodyContainerClientProps,
) => {
  const postComments = useAppSelector(selBlogPostComments);
  const { postId } = useBlogPostDetailCommentParamsCtx();
  const { id: userId } = useAppSelector(selUserData);

  const dispatch = useAppDispatch();
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

  const handleEdit = async (editValue: BaseCommentCreateParamsModel) => {
    const updateParams: BlogPostCommentUpdateParamsModel = {
      commentValue: editValue.commentValue,
      password: editValue.password,
      commentId: editValue.id,
      postId,
    };

    await dispatch(effBlogPostCommentUpdate(updateParams))
      .unwrap()
      .then(() => {
        toast.open('success', '댓글이 수정되었습니다.');
      })
      .catch((err) => toast.open('error', err.message));
  };

  const handleDelete = async (commentId: string, password: string) => {
    const deleteParams: BlogPostCommentDeleteParamsModel = {
      password,
      commentId,
      postId,
    };

    await dispatch(effBlogPostCommentDelete(deleteParams))
      .unwrap()
      .then(() => toast.open('success', '댓글이 삭제되었습니다.'))
      .catch((err) => toast.open('error', err.message));
  };

  return (
    <>
      {postComments.map(({ commentReplies, ...props }) => (
        <div key={props.id}>
          <BlogDetailCommentBody
            {...props}
            isAuthor={userId === props.userId}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onShowReply={handleShowReply}
          />

          {getIsShownReply(props.id) && (
            <BlogDetailCommentReplyContainerClient
              comments={commentReplies}
              commentId={props.id}
            />
          )}
        </div>
      ))}
    </>
  );
};
