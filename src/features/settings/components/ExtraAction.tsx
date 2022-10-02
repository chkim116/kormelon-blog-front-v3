import { MouseEventHandler } from 'react';
import { Add, Check, Close, Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface ExtraActionProps {
  isEditMode: boolean;
  onEditMode: () => void;
  onAdd?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

export const ExtraAction = ({
  isEditMode,
  onEditMode,
  onAdd,
  onUpdate,
  onDelete,
}: ExtraActionProps) => {
  const handleAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onAdd?.();
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
    <>
      <IconButton
        sx={{ mx: 1 }}
        edge="start"
        color="success"
        aria-label="edit finish button"
        onClick={handleUpdate}
      >
        <Check />
      </IconButton>
      <IconButton
        edge="start"
        color="default"
        aria-label="edit mode close"
        onClick={handleEditMode}
      >
        <Close />
      </IconButton>
    </>
  ) : (
    <>
      {onAdd && (
        <IconButton
          edge="start"
          color="primary"
          aria-label="create category"
          onClick={handleAdd}
        >
          <Add />
        </IconButton>
      )}

      <IconButton
        edge="start"
        color="default"
        aria-label="edit category"
        onClick={handleEditMode}
      >
        <Edit />
      </IconButton>
      <IconButton
        onClick={handleDelete}
        edge="start"
        color="error"
        aria-label="delete category"
      >
        <Delete />
      </IconButton>
    </>
  );
};
