'use client';

import { ChangeEventHandler, useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { SubCategoryUpdateUiParams } from '@features/categories/domains/category.uiState';
import { LucideIcon } from '@shared/components/common/LucideIcon';
import { SettingsCategoryExtraAction } from './SettingsCategoryExtraAction';

interface SettingsCategorySubCategoryItemProps {
  id: number;
  value: string;
  onSubUpdateClick: (params: SubCategoryUpdateUiParams) => void;
  onSubDeleteClick: (id: number) => void;
}

export const SettingsCategorySubCategoryItem = ({
  id,
  value,
  onSubUpdateClick,
  onSubDeleteClick,
}: SettingsCategorySubCategoryItemProps) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditable, setIsEditable] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditableClick = () => {
    setIsEditable((prev) => !prev);
  };

  const handleSubUpdateClick = () => {
    onSubUpdateClick({ id, value: editValue });
    setIsEditable((prev) => !prev);
  };

  const handleSubDeleteClick = () => {
    onSubDeleteClick(id);
  };

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  return (
    <div className="pl-4 flex list-style-none gap-2 items-center justify-between">
      <LucideIcon name="minus" fontSize="small" className="mb-0.5" />
      {isEditable ? (
        <>
          <Input
            className="flex-1"
            onChange={handleChange}
            value={editValue}
            data-cy="edit-sub-category-input"
          />
          <SettingsCategoryExtraAction
            isEditMode={isEditable}
            onEditMode={handleEditableClick}
            onUpdate={handleSubUpdateClick}
          />
        </>
      ) : (
        <>
          <p className="truncate flex-1">{value}</p>
          <SettingsCategoryExtraAction
            isEditMode={isEditable}
            onEditMode={handleEditableClick}
            onDelete={handleSubDeleteClick}
          />
        </>
      )}
    </div>
  );
};
