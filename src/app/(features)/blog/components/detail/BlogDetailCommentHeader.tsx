'use client';
import { useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { Button, Input, User } from '@nextui-org/react';
import { Dialog } from '@shared/components/common';

interface BlogDetailCommentHeaderProps {
  userProfile: string;
  username: string;
  createdAt: string;
  isAnonymous: boolean;
  isAuthor: boolean;
  isDeleted: boolean;
  onEditStart: () => void;
  onChangePassword: (password: string) => void;
  onDelete: () => void;
}

export const BlogDetailCommentHeader = ({
  userProfile,
  username,
  createdAt,
  isAnonymous,
  isAuthor,
  isDeleted,
  onEditStart,
  onChangePassword,
  onDelete,
}: BlogDetailCommentHeaderProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isShowingEditButtons = (isAnonymous || isAuthor) && !isDeleted;

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleChangePassword = (value: string) => {
    onChangePassword(value);
  };

  const handleDelete = () => {
    onDelete();
    handleDeleteDialogClose();
  };

  const renderDialogText = isAnonymous
    ? '익명 댓글을 삭제합니다. 비밀번호를 입력해 주세요.'
    : '댓글을 삭제합니다.';
  const renderDeleteDialogContent = isAnonymous ? (
    <Input
      variant="underlined"
      fullWidth
      type="password"
      placeholder="Password"
      onValueChange={handleChangePassword}
    />
  ) : null;

  return (
    <div className="flex justify-between">
      <div className="p-3 flex flex-col w-full justify-between">
        <div className="flex justify-between items-center">
          <User
            name={username}
            avatarProps={{
              src: userProfile,
              alt: '유저 프로필',
              size: 'sm',
            }}
          />
        </div>

        <p className="text-sm mt-2">{createdAt}</p>
      </div>

      {isShowingEditButtons && (
        <div className="flex gap-1 p-3">
          <Button variant="light" isIconOnly size="sm" onClick={onEditStart}>
            <Edit fontSize="small" />
          </Button>

          <Button
            variant="light"
            isIconOnly
            size="sm"
            onClick={handleDeleteDialogOpen}
          >
            <Delete fontSize="small" />
          </Button>
        </div>
      )}

      <Dialog
        open={isDeleteDialogOpen}
        text={renderDialogText}
        onOk={handleDelete}
        onClose={handleDeleteDialogClose}
      >
        {renderDeleteDialogContent}
      </Dialog>
    </div>
  );
};
