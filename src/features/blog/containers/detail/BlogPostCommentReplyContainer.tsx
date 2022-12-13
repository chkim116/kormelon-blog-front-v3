import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@common/store';
import { feedbackService } from '@common/components';
import { selUserData } from '@shared/stores/auth';
import {
  BlogPostCommentCreator,
  BlogPostCommentReply,
  BlogPostCommentReplyOpenButton,
} from '@features/blog/components/detail';
import {
  BaseCommentCreateParamsModel,
  BlogPostCommentReplyCreateParamsModel,
  BlogPostCommentReplyDeleteParamsModel,
  BlogPostCommentReplySearchModel,
  BlogPostCommentReplyUpdateParamsModel,
} from '@features/blog/models';
import {
  effBlogPostCommentReplyCreate,
  effBlogPostCommentReplyDelete,
  effBlogPostCommentReplyUpdate,
} from '@features/blog/stores';

interface BlogPostCommentReplyContainerProps {
  postId: number;
  commentId: string;
  userId: string;
  replies: BlogPostCommentReplySearchModel[];
}

/**
 * @Internal
 */
export const BlogPostCommentReplyContainer = ({
  postId,
  commentId,
  userId,
  replies,
}: BlogPostCommentReplyContainerProps) => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector(selUserData);
  const isAnonymous = useMemo(() => !id, [id]);

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyPassword, setReplyPassword] = useState('');
  const [replyEditId, setReplyEditId] = useState('');
  const [replyEditValue, setReplyEditValue] = useState('');

  const handleToggleReply = () => {
    setIsReplyOpen((prev) => !prev);
  };

  const handleChangePassword = (password: string) => {
    setReplyPassword(password);
  };

  const handleEditChange = (_: string, value: string) => {
    setReplyEditValue(value);
  };

  const handleEditStart = (replyId: string) => {
    setReplyEditId(replyId);
  };

  const handleEditCancel = () => {
    setReplyEditId('');
    setReplyPassword('');
  };

  const handleEditConfirm = () => {
    const params: BlogPostCommentReplyUpdateParamsModel = {
      commentId: replyEditId,
      commentValue: replyEditValue,
      password: replyPassword,
      postId,
    };

    dispatch(effBlogPostCommentReplyUpdate(params))
      .unwrap()
      .then(() => feedbackService('success', '댓글이 수정되었습니다.'))
      .catch((err) => feedbackService('error', err.message))
      .finally(() => {
        setReplyEditId('');
        setReplyEditValue('');
        setReplyPassword('');
      });
  };

  const handleDeleteCurried = (id: string) => () => {
    const params: BlogPostCommentReplyDeleteParamsModel = {
      commentId: id,
      postId,
      password: replyPassword,
    };

    dispatch(effBlogPostCommentReplyDelete(params))
      .unwrap()
      .then(() => feedbackService('success', '댓글이 삭제되었습니다.'))
      .catch((err) => feedbackService('error', err.message))
      .finally(() => setReplyPassword(''));
  };

  const handleCreateSubmit = (commentValues: BaseCommentCreateParamsModel) => {
    const params: BlogPostCommentReplyCreateParamsModel = {
      postId,
      commentId,
      ...commentValues,
    };

    dispatch(effBlogPostCommentReplyCreate(params))
      .unwrap()
      .then(() => feedbackService('success', '댓글이 작성되었습니다.'))
      .catch((err) => feedbackService('error', err.message))
      .finally(() => setReplyPassword(''));
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="right" mb={2}>
        <BlogPostCommentReplyOpenButton
          replyLength={replies.length}
          onOpen={handleToggleReply}
        />
      </Box>

      <Box pl={3}>
        {isReplyOpen && (
          <>
            <BlogPostCommentCreator
              isAnonymous={isAnonymous}
              onSubmit={handleCreateSubmit}
            />
            {replies.map((reply) => (
              <BlogPostCommentReply
                key={reply.id}
                userId={userId}
                replyEditMode={replyEditId === reply.id}
                reply={reply}
                onDelete={handleDeleteCurried(reply.id)}
                onChangePassword={handleChangePassword}
                onEditStart={handleEditStart}
                onEditChange={handleEditChange}
                onEditCancel={handleEditCancel}
                onEditConfirm={handleEditConfirm}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};
