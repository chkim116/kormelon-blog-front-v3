import { useRef, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { BlogPostCommentReplySearchModel } from '@features/blog/models';
import { BlogPostCommentTextField } from './BlogPostCommentTextField';
import { BlogPostCommentEditButtons, BlogPostCommentHeader } from '.';

interface BlogPostCommentReplyProps {
  userId: string;
  replyEditMode: boolean;
  reply: BlogPostCommentReplySearchModel;
  onDelete: () => void;
  onChangePassword: (password: string) => void;
  onEditStart: (id: string) => void;
  onEditChange: (name: string, value: string) => void;
  onEditCancel: () => void;
  onEditConfirm: () => void;
}

export const BlogPostCommentReply = ({
  userId,
  reply,
  replyEditMode,
  onChangePassword,
  onDelete,
  onEditStart,
  onEditCancel,
  onEditChange,
  onEditConfirm,
}: BlogPostCommentReplyProps) => {
  const originValue = useRef(reply.value);
  const [value, setValue] = useState(reply.value);

  const handleEditChange = (name: string, value: string) => {
    setValue(value);
    onEditChange(name, value);
  };

  const handleEditStart = () => {
    onEditStart(reply.id);
  };

  const handleEditConfirm = () => {
    onEditConfirm();
    setValue(originValue.current);
  };

  return (
    <Box>
      <BlogPostCommentHeader
        username={reply.username}
        createdAt={reply.createdAt}
        isAnonymous={reply.isAnonymous}
        isAuthor={reply.isAnonymous || reply.userId === userId}
        isDeleted={Boolean(reply.deletedAt)}
        onEditStart={handleEditStart}
        onDelete={onDelete}
        onChangePassword={onChangePassword}
      />

      <BlogPostCommentTextField
        value={value}
        readonly={!replyEditMode}
        onChange={handleEditChange}
      />

      {replyEditMode && (
        <Box display="flex" justifyContent="right" my={1} width="100%">
          <BlogPostCommentEditButtons
            isAnonymous={reply.isAnonymous}
            onEditCancel={onEditCancel}
            onChangePassword={onChangePassword}
            onEditConfirm={handleEditConfirm}
          />
        </Box>
      )}

      <Divider sx={{ pb: 2, mb: 2 }} />
    </Box>
  );
};
