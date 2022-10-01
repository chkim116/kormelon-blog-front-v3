import { ChangeEventHandler, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import {
  CategoryUpdateParams,
  SubCategoryEntity,
  SubCategoryUpdateParams,
} from '@core/entities';
import { CreateSubCategoryDialog } from './CreateSubCategoryDialog';
import { ExtraAction } from './ExtraAction';
import { SubCategoryItem } from './SubCategoryItem';

interface CategoryItemProps {
  id: number;
  value: string;
  subCategories: Omit<SubCategoryEntity, 'posts'>[];
  openIds: number[];
  onCollapse: (id: number) => void;
  onAdd: (id: number, value: string) => void;
  onUpdate: (
    isSubCategory: boolean,
    params: CategoryUpdateParams | SubCategoryUpdateParams,
  ) => void;
  onDelete: (isSubCategory: boolean, id: number) => void;
}

function refineNumbers(ids: number[], id: number) {
  const isExist = ids.some((prevId) => prevId === id);
  if (isExist) {
    return ids.filter((prevId) => prevId !== id);
  }
  return [...ids, id];
}

export const CategoryItem = ({
  id,
  value,
  subCategories,
  openIds,
  onAdd,
  onCollapse,
  onUpdate,
  onDelete,
}: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editableIds, setEditableIds] = useState<number[]>([]);
  const [newValue, setNewValue] = useState(value);

  const getIsEditable = (id: number) => editableIds.includes(id);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewValue(e.target.value);
  };

  const handleAddModalToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAdd = (newSubCategoryValue: string) => {
    onAdd(id, newSubCategoryValue);
    setIsOpen(false);
  };

  const handleUpdate = () => {
    onUpdate(false, { categoryId: id, value: newValue });
    setEditableIds((prev) => refineNumbers(prev, id));
  };

  const handleDeleteCategory = () => {
    onDelete(false, id);
  };

  const handleCollapse = () => {
    onCollapse(id);
  };

  const handleEditMode = () => {
    setEditableIds((prev) => refineNumbers(prev, id));
  };

  const handleUpdateSubCategory = (id: number, value: string) => {
    onUpdate(true, { id, value });
  };

  const handleDeleteSubCategory = (id: number) => {
    onDelete(true, id);
  };

  return (
    <>
      <ListItemButton onClick={handleCollapse} divider>
        {getIsEditable(id) ? (
          <>
            <TextField
              fullWidth
              sx={{ zIndex: 10, backgroundColor: 'background.paper' }}
              onChange={handleChange}
              value={newValue}
              autoComplete="off"
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
              onAdd={handleAddModalToggle}
              onDelete={handleDeleteCategory}
            />
          </>
        )}

        {openIds.includes(id) ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openIds.includes(id)} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subCategories.map((subCategory) => (
            <SubCategoryItem
              key={subCategory.id}
              id={subCategory.id}
              value={subCategory.value}
              onUpdate={handleUpdateSubCategory}
              onDelete={handleDeleteSubCategory}
            />
          ))}
        </List>
      </Collapse>

      <CreateSubCategoryDialog
        isOpen={isOpen}
        onOk={handleAdd}
        onClose={handleAddModalToggle}
      />
    </>
  );
};
