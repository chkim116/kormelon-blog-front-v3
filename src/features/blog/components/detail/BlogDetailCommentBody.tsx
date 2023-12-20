'use client';
import { useCallback, useState } from 'react';
import { Button } from '@nextui-org/react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {
  CommentSearchUiState,
  CommentUpdateUiParams,
} from '@features/blog/domains/comment/comment.uiState';
import { createCommentUpdateUiParams } from '@features/blog/domains/comment/comment.create';
import { LucideIcon } from '@shared/components/common/LucideIcon';
import { BlogDetailCommentBodyText } from './BlogDetailCommentBodyText';
import { BlogDetailCommentEditConfirmModal } from './BlogDetailCommentEditConfirmModal';
import { BlogDetailCommentHeader } from './BlogDetailCommentHeader';

interface OmitCommentSearchUiState
  extends Omit<CommentSearchUiState, 'commentReplies' | 'userId'> {}

interface BlogDetailCommentBodyProps extends OmitCommentSearchUiState {
  isAuthor: boolean;
  shownReply?: boolean;
  replyLength?: number;
  onShowReply?: (id: string, shown: boolean) => void;
  onEdit: (updateParams: CommentUpdateUiParams) => Promise<void>;
  onDelete: (id: string, password: string) => Promise<void>;
}

export const BlogDetailCommentBody = ({
  isAuthor,
  shownReply = true,
  createdAt,
  isDeleted,
  id,
  isAnonymous,
  userProfile,
  username,
  value,
  replyLength,
  onDelete,
  onEdit,
  onShowReply,
}: BlogDetailCommentBodyProps) => {
  const [editable, setEditable] = useState(false);
  const [shouldShowReply, setShouldShowReply] = useState(false);
  const [updateParams, setUpdateParams] = useState(
    createCommentUpdateUiParams(),
  );

  const mutateUpdateParams = useCallback(
    (args: Partial<CommentUpdateUiParams>) => {
      setUpdateParams((prev) => ({ ...prev, ...args }));
    },
    [],
  );

  const handleEditChange = (name: string, value: string) => {
    mutateUpdateParams({ [name]: value });
  };

  const handleEditCancel = () => {
    setEditable(false);
    mutateUpdateParams(createCommentUpdateUiParams());
  };

  const handleEditStart = () => {
    setEditable(true);
    mutateUpdateParams({ commentId: id, password: '', commentValue: value });
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

  useDeepCompareEffect(() => {
    mutateUpdateParams({ commentValue: value });
  }, [mutateUpdateParams, value]);

  return (
    <div className="rounded-md my-4">
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
          className="flex items-center my-1 ml-1"
          color={shouldShowReply ? 'danger' : 'default'}
          onClick={handleShowReply}
        >
          <LucideIcon size={20} name="message-square" className="mt-0.5" />
          {shouldShowReply ? 'Dismiss' : `Reply (${replyLength})`}
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
