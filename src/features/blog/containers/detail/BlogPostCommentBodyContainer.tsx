import { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { feedbackService } from '@common/components/Feedback';
import { useAppDispatch, useAppSelector } from '@common/store';
import { selUserData } from '@shared/stores/auth';
import {
  BlogPostCommentEditButtons,
  BlogPostCommentHeader,
  BlogPostCommentTextField,
} from '@features/blog/components/detail';
import { createBlogPostCommentCreateParamsModel } from '@features/blog/manipulates';
import {
  BlogPostCommentDeleteParamsModel,
  BlogPostCommentReplySearchModel,
  BlogPostCommentUpdateParamsModel,
} from '@features/blog/models';
import {
  effBlogPostCommentDelete,
  effBlogPostCommentUpdate,
} from '@features/blog/stores';

interface BlogPostCommentBodyContainerProps {
  postId: number;
  commentId: string;
  commentAuthorId: string | null;
  username: string;
  commentValue: string;
  createdAt: string;
  deletedAt: string | null;
  isAnonymous: boolean;
  commentReplies: BlogPostCommentReplySearchModel[];
}
/**
 * @internal
 */
export const BlogPostCommentBodyContainer = ({
  commentAuthorId,
  username,
  isAnonymous,
  commentValue,
  commentId,
  createdAt,
  deletedAt,
  postId,
}: BlogPostCommentBodyContainerProps) => {
  const { id: userId } = useAppSelector(selUserData);
  const dispatch = useAppDispatch();

  const [editCommentId, setEditCommentId] = useState('');
  const [editValue, setEditValue] = useState(
    createBlogPostCommentCreateParamsModel,
  );

  const isEditMode = useMemo(
    () => editCommentId === commentId,
    [commentId, editCommentId],
  );

  const isAuthor = useMemo(
    () => isAnonymous || commentAuthorId === userId,
    [commentAuthorId, isAnonymous, userId],
  );

  const isDeleted = useMemo(() => Boolean(deletedAt), [deletedAt]);

  const handleEditChange = (name: string, value: string) => {
    setEditValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditConfirm = () => {
    const updateParams: BlogPostCommentUpdateParamsModel = {
      commentValue: editValue.commentValue,
      password: editValue.password,
      commentId,
      postId,
    };

    dispatch(effBlogPostCommentUpdate(updateParams))
      .unwrap()
      .then(() => {
        feedbackService('success', '댓글이 수정되었습니다.');
        setEditCommentId('');
      })
      .catch((err) => feedbackService('error', err.message))
      .finally(() => setEditValue((prev) => ({ ...prev, password: '' })));
  };

  const handleEditStartCurried = (id: string) => () => {
    if (id === '') {
      setEditValue((prev) => ({ ...prev, commentValue }));
    }

    setEditValue((prev) => ({ ...prev, password: '' }));
    setEditCommentId((prev) => (prev === id ? '' : id));
  };

  const handleChangePassword = (password: string) => {
    setEditValue((prev) => ({ ...prev, password }));
  };

  const handleDeleteConfirm = () => {
    const deleteParams: BlogPostCommentDeleteParamsModel = {
      password: editValue.password,
      commentId,
      postId,
    };

    dispatch(effBlogPostCommentDelete(deleteParams))
      .unwrap()
      .then(() => feedbackService('success', '댓글이 삭제되었습니다.'))
      .catch((err) => feedbackService('error', err.message))
      .finally(() => setEditValue((prev) => ({ ...prev, password: '' })));
  };

  useEffect(() => {
    if (editCommentId) {
      setEditValue((prev) => ({ ...prev, commentValue }));
    }
  }, [commentValue, editCommentId]);

  useEffect(() => {
    setEditValue((prev) => ({ ...prev, commentValue }));
  }, [commentValue]);

  return (
    <Box>
      <BlogPostCommentHeader
        username={username}
        createdAt={createdAt}
        isAnonymous={isAnonymous}
        isAuthor={isAuthor}
        isDeleted={isDeleted}
        onEditStart={handleEditStartCurried(commentId)}
        onChangePassword={handleChangePassword}
        onDelete={handleDeleteConfirm}
      />

      <BlogPostCommentTextField
        value={editValue.commentValue}
        readonly={!isEditMode}
        onChange={handleEditChange}
      />

      {isEditMode && (
        <Box display="flex" justifyContent="right" my={1} width="100%">
          <BlogPostCommentEditButtons
            isAnonymous={isAnonymous}
            onEditCancel={handleEditStartCurried('')}
            onChangePassword={handleChangePassword}
            onEditConfirm={handleEditConfirm}
          />
        </Box>
      )}
    </Box>
  );
};
