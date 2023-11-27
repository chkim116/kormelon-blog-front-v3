'use client';

import { MouseEventHandler } from 'react';
import { Button } from '@nextui-org/react';
import { LucideIcon } from '@shared/components/common/LucideIcon';

interface SettingsCategoryExtraActionProps {
  isEditMode: boolean;
  onEditMode: () => void;
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const SettingsCategoryExtraAction = ({
  isEditMode,
  onEditMode,
  onCreate,
  onUpdate,
  onDelete,
}: SettingsCategoryExtraActionProps) => {
  const handleCreate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onCreate?.();
  };

  const handleEditMode: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onEditMode();
  };

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onUpdate?.();
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onDelete?.();
  };

  return isEditMode ? (
    <div>
      <Button
        className="mx-1"
        isIconOnly
        variant="light"
        color="success"
        aria-label="수정 완료 버튼"
        data-cy="edit-finish"
        onClick={handleUpdate}
      >
        <LucideIcon name="check" />
      </Button>
      <Button
        variant="light"
        color="danger"
        isIconOnly
        aria-label="수정 취소 버튼"
        onClick={handleEditMode}
      >
        <LucideIcon name="x" />
      </Button>
    </div>
  ) : (
    <div>
      {onCreate && (
        <Button
          isIconOnly
          variant="light"
          color="primary"
          aria-label="카테고리 생성"
          onClick={handleCreate}
          data-cy="create-category-modal-open"
        >
          <LucideIcon name="plus" />
        </Button>
      )}

      <Button
        variant="light"
        isIconOnly
        aria-label="카테고리 수정"
        data-cy="edit-category"
        onClick={handleEditMode}
      >
        <LucideIcon name="pencil" />
      </Button>
      <Button
        isIconOnly
        onClick={handleDelete}
        variant="light"
        color="danger"
        aria-label="카테고리 삭제"
        data-cy="delete-category"
      >
        <LucideIcon name="trash" />
      </Button>
    </div>
  );
};
