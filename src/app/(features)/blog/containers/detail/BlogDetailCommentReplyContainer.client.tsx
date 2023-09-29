'use client';
import React, { useMemo } from 'react';
import { Divider } from '@nextui-org/react';
import {
  BaseCommentCreateParamsModel,
  BlogPostCommentReplyDeleteParamsModel,
  BlogPostCommentReplySearchModel,
  BlogPostCommentReplyUpdateParamsModel,
} from '@domain/uiStates';
import { toast } from '@shared/services';
import { useAppDispatch, useAppSelector } from '@shared/stores';
import { selUserData } from '@shared/stores/auth';
import {
  BlogDetailCommentBody,
  BlogDetailCommentTextarea,
} from '@app/blog/components/detail';
import { useBlogPostDetailCommentParamsCtx } from '@app/blog/contexts';
import {
  effBlogPostCommentReplyCreate,
  effBlogPostCommentReplyDelete,
  effBlogPostCommentReplyUpdate,
} from '@app/blog/stores';

interface BlogDetailCommentReplyContainerClientProps {
  comments: BlogPostCommentReplySearchModel[];
  commentId: string;
}

export const BlogDetailCommentReplyContainerClient = ({
  comments,
  commentId,
}: BlogDetailCommentReplyContainerClientProps) => {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector(selUserData);
  const { postId } = useBlogPostDetailCommentParamsCtx();

  const isAnonymous = useMemo(() => Boolean(userId), [userId]);

  const handleSubmit = async (commentValue: BaseCommentCreateParamsModel) => {
    await dispatch(
      effBlogPostCommentReplyCreate({ ...commentValue, commentId, postId }),
    )
      .unwrap()
      .then(() => {
        toast.open('success', '댓글이 작성되었습니다.');
      })
      .catch((err) => {
        toast.open('error', err.message);
      });
  };

  const handleEdit = async (editValue: BaseCommentCreateParamsModel) => {
    const updateParams: BlogPostCommentReplyUpdateParamsModel = {
      commentValue: editValue.commentValue,
      password: editValue.password,
      commentId: editValue.id,
      postId,
    };

    await dispatch(effBlogPostCommentReplyUpdate(updateParams))
      .unwrap()
      .then(() => {
        toast.open('success', '댓글이 수정되었습니다.');
      })
      .catch((err) => toast.open('error', err.message));
  };

  const handleDelete = async (commentId: string, password: string) => {
    const deleteParams: BlogPostCommentReplyDeleteParamsModel = {
      password,
      commentId,
      postId,
    };

    await dispatch(effBlogPostCommentReplyDelete(deleteParams))
      .unwrap()
      .then(() => toast.open('success', '댓글이 삭제되었습니다.'))
      .catch((err) => toast.open('error', err.message));
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
