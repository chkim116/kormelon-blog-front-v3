import { ChangeEventHandler, useState } from 'react';
import { ListItemButton, ListItemText, TextField } from '@mui/material';
import { ExtraAction } from './ExtraAction';

interface SubCategoryItemProps {
  id: number;
  value: string;
  onUpdate: (id: number, value: string) => void;
  onDelete: (id: number) => void;
}

function refineNumbers(ids: number[], id: number) {
  const isExist = ids.some((prevId) => prevId === id);
  if (isExist) {
    return ids.filter((prevId) => prevId !== id);
  }
  return [...ids, id];
}

export const SubCategoryItem = ({
  id,
  value,
  onUpdate,
  onDelete,
}: SubCategoryItemProps) => {
  const [editableIds, setEditableIds] = useState<number[]>([]);
  const [newValue, setNewValue] = useState(value);
  const getIsEditable = (id: number) => editableIds.includes(id);

  const handleUpdate = () => {
    onUpdate(id, newValue);
    setEditableIds((prev) => refineNumbers(prev, id));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewValue(e.target.value);
  };

  const handleEditMode = () => {
    setEditableIds((prev) => refineNumbers(prev, id));
  };

  const handleDeleteSubCategory = () => {
    onDelete(id);
  };

  return (
    <ListItemButton key={id} sx={{ pl: 4 }} divider>
      {getIsEditable(id) ? (
        <>
          <TextField
            fullWidth
            onChange={handleChange}
            value={newValue}
            sx={{ zIndex: 10, backgroundColor: 'background.paper' }}
            data-cy="edit-sub-category-input"
          />
          <ExtraAction
            isEditMode={getIsEditable(id)}
            onEditMode={handleEditMode}
            onUpdate={handleUpdate}
          />
        </>
      ) : (
        <>
          <ListItemText primary={value} />
          <ExtraAction
            isEditMode={getIsEditable(id)}
            onEditMode={handleEditMode}
            onDelete={handleDeleteSubCategory}
          />
        </>
      )}
    </ListItemButton>
  );
};
