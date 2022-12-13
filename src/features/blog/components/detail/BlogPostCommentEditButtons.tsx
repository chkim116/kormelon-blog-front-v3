import { ChangeEventHandler, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Dialog } from '@common/components';

interface BlogPostCommentEditButtonsProps {
  isAnonymous: boolean;
  onEditConfirm: () => void;
  onEditCancel: () => void;
  onChangePassword: (password: string) => void;
}

export const BlogPostCommentEditButtons = ({
  isAnonymous,
  onEditCancel,
  onEditConfirm,
  onChangePassword,
}: BlogPostCommentEditButtonsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangePassword(e.target.value);
  };

  const handleOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleEditConfirm = () => {
    onEditConfirm();
    handleClose();
  };

  const renderDialogText = isAnonymous
    ? '익명 댓글을 수정합니다. 비밀번호를 입력해 주세요.'
    : '댓글을 수정합니다.';
  const renderDialogContent = isAnonymous ? (
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
    <>
      <Button variant="contained" onClick={handleOpen}>
        수정
      </Button>
      <Button variant="outlined" onClick={onEditCancel}>
        취소
      </Button>

      <Dialog
        text={renderDialogText}
        extraContent={renderDialogContent}
        open={isDialogOpen}
        onOk={handleEditConfirm}
        onClose={handleClose}
      />
    </>
  );
};
