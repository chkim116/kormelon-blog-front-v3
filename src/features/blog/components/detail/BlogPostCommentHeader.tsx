import { ChangeEventHandler, useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { Dialog } from '@common/components';

interface BlogPostCommentHeaderProps {
  username: string;
  createdAt: string;
  isAnonymous: boolean;
  isAuthor: boolean;
  isDeleted: boolean;
  onEditStart: () => void;
  onChangePassword: (password: string) => void;
  onDelete: () => void;
}

export const BlogPostCommentHeader = ({
  username,
  createdAt,
  isAnonymous,
  isAuthor,
  isDeleted,
  onEditStart,
  onChangePassword,
  onDelete,
}: BlogPostCommentHeaderProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isShowingEditButtons = (isAnonymous || isAuthor) && !isDeleted;

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangePassword(e.target.value);
  };

  const handleDelete = () => {
    onDelete();
    handleDeleteDialogClose();
  };

  const renderDialogText = isAnonymous
    ? '익명 댓글을 삭제합니다. 비밀번호를 입력해 주세요.'
    : '댓글을 삭제합니다.';
  const renderDeleteDialogContent = isAnonymous ? (
    <TextField
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      margin="dense"
      id="password"
      variant="standard"
      fullWidth
      type="password"
      onChange={handleChangePassword}
    />
  ) : null;

  return (
    <Box mt={6} display="flex" justifyContent="space-between">
      <Box pb={2}>
        <Box>{username}</Box>
        <Typography mt={1} variant="subtitle1">
          {createdAt}
        </Typography>
      </Box>

      {isShowingEditButtons && (
        <Box>
          <IconButton size="small" onClick={onEditStart}>
            <Edit fontSize="small" />
          </IconButton>

          <IconButton size="small" onClick={handleDeleteDialogOpen}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Dialog
        open={isDeleteDialogOpen}
        text={renderDialogText}
        extraContent={renderDeleteDialogContent}
        onOk={handleDelete}
        onClose={handleDeleteDialogClose}
      />
    </Box>
  );
};
