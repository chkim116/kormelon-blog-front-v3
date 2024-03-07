'use client';
import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { Dialog } from '@common/components/Dialog';

interface BlogDetailCommentEditConfirmModalProps {
  isAnonymous: boolean;
  onChangePassword: (password: string) => void;
  onCancel: () => void;
  onOk: () => void;
}

export const BlogDetailCommentEditConfirmModal = ({
  isAnonymous,
  onChangePassword,
  onCancel,
  onOk,
}: BlogDetailCommentEditConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangePassword = (value: string) => {
    onChangePassword(value);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEditConfirm = () => {
    onOk();
    handleClose();
  };

  const renderDialogText = isAnonymous
    ? '익명 댓글을 수정합니다. 비밀번호를 입력해 주세요.'
    : '댓글을 수정합니다.';
  const renderDialogContent = isAnonymous ? (
    <Input
      variant="underlined"
      fullWidth
      type="password"
      placeholder="Password"
      onValueChange={handleChangePassword}
    />
  ) : null;

  return (
    <>
      <Button onClick={handleOpen} color="primary" size="sm" variant="light">
        완료
      </Button>
      <Button onClick={onCancel} color="danger" size="sm" variant="light">
        취소
      </Button>

      <Dialog
        text={renderDialogText}
        open={isOpen}
        onOk={handleEditConfirm}
        onClose={handleClose}
      >
        {renderDialogContent}
      </Dialog>
    </>
  );
};
