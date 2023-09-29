'use client';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import {
  BaseCommentCreateParamsModel,
  BlogPostCommentSearchModel,
} from '@domain/uiStates';
import { createBlogPostCommentCreateParamsModel } from '@domain/manipulates';
import {
  BlogDetailCommentBodyText,
  BlogDetailCommentEditConfirmModal,
  BlogDetailCommentHeader,
} from '.';

interface OmitBlogPostCommentSearchModel
  extends Omit<BlogPostCommentSearchModel, 'commentReplies' | 'userId'> {}

interface BlogDetailCommentBodyProps extends OmitBlogPostCommentSearchModel {
  isAuthor: boolean;
  shownReply?: boolean;
  onShowReply?: (id: string, shown: boolean) => void;
  onEdit: (updateParams: BaseCommentCreateParamsModel) => Promise<void>;
  onDelete: (id: string, password: string) => Promise<void>;
}

export const BlogDetailCommentBody = ({
  isAuthor,
  shownReply = true,
  createdAt,
  deletedAt,
  id,
  isAnonymous,
  userProfile,
  username,
  value,
  onDelete,
  onEdit,
  onShowReply,
}: BlogDetailCommentBodyProps) => {
  const [editable, setEditable] = useState(false);
  const [shouldShowReply, setShouldShowReply] = useState(false);
  const [updateParams, setUpdateParams] = useState(
    createBlogPostCommentCreateParamsModel,
  );

  const isDeleted = Boolean(deletedAt);

  const mutateUpdateParams = useCallback(
    (args: Partial<BaseCommentCreateParamsModel>) => {
      setUpdateParams((prev) => ({ ...prev, ...args }));
    },
    [],
  );

  const handleEditChange = (name: string, value: string) => {
    mutateUpdateParams({ [name]: value });
  };

  const handleEditCancel = () => {
    setEditable(false);
    mutateUpdateParams(createBlogPostCommentCreateParamsModel());
  };

  const handleEditStart = () => {
    setEditable(true);
    mutateUpdateParams({ id, password: '', commentValue: value });
  };

  const handleChangePassword = (password: string) => {
    mutateUpdateParams({ password });
  };

  const handleDeleteConfirm = () => {
    onDelete(id, updateParams.password).then(handleEditCancel);
  };

  const handleEditConfirm = () => {
    onEdit(updateParams).then(handleEditCancel);
  };

  const handleShowReply = () => {
    setShouldShowReply((prev) => !prev);
    onShowReply?.(id, !shouldShowReply);
  };

  useEffect(() => {
    mutateUpdateParams({ commentValue: value });
  }, [mutateUpdateParams, value]);

  return (
    <div className="border rounded-md my-4">
      <BlogDetailCommentHeader
        userProfile={userProfile}
        username={username}
        createdAt={createdAt}
        isAnonymous={isAnonymous}
        isAuthor={isAnonymous || isAuthor}
        isDeleted={isDeleted}
        onEditStart={handleEditStart}
        onChangePassword={handleChangePassword}
        onDelete={handleDeleteConfirm}
      />

      <BlogDetailCommentBodyText
        value={isDeleted ? '댓글이 삭제되었습니다.' : value}
        editable={editable}
        onChange={handleEditChange}
      />

      {shownReply && (
        <Button
          variant="light"
          className="flex items-center my-1"
          color={shouldShowReply ? 'danger' : 'default'}
          onClick={handleShowReply}
        >
          <ChatBubbleOutlineRoundedIcon fontSize="inherit" className="mt-0.5" />
          {shouldShowReply ? 'Dismiss' : 'Reply'}
        </Button>
      )}

      {editable && (
        <div className="flex justify-right my-1 w-full">
          <BlogDetailCommentEditConfirmModal
            isAnonymous={isAnonymous}
            onChangePassword={handleChangePassword}
            onCancel={handleEditCancel}
            onOk={handleEditConfirm}
          />
        </div>
      )}
    </div>
  );
};
